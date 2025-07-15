import pandas as pd
import torch
from torch.utils.data import Dataset
from transformers import BertTokenizer, BertForSequenceClassification, Trainer, TrainingArguments
from datasets import Dataset as HFDataset
import evaluate


device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")


df = pd.read_csv("augmented_dataset.csv")


df = df.dropna().sample(frac=1).reset_index(drop=True)


label_map = {label: i for i, label in enumerate(df["Cognitive Distortion Type"].unique())}
df["label"] = df["Cognitive Distortion Type"].map(label_map)


tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")


def tokenize_function(examples):
    return tokenizer(examples["Journal Entry"], truncation=True, padding="max_length", max_length=128)


hf_dataset = HFDataset.from_pandas(df)
hf_dataset = hf_dataset.map(tokenize_function, batched=True)
hf_dataset = hf_dataset.remove_columns(["Journal Entry", "Cognitive Distortion Type"])


train_test_split = hf_dataset.train_test_split(test_size=0.2, seed=42)
train_dataset = train_test_split["train"]
val_dataset = train_test_split["test"]


model = BertForSequenceClassification.from_pretrained("bert-base-uncased", num_labels=len(label_map)).to(device)


metric = evaluate.load("accuracy")

def compute_metrics(eval_pred):
    logits, labels = eval_pred
    predictions = torch.argmax(torch.tensor(logits).detach().cpu(), dim=-1).numpy()
    return metric.compute(predictions=predictions, references=labels)


training_args = TrainingArguments(
    output_dir="./results",
    evaluation_strategy="epoch",
    save_strategy="epoch",
    learning_rate=2e-5,
    per_device_train_batch_size=8, 
    per_device_eval_batch_size=8,
    num_train_epochs=5,  
    weight_decay=0.01,
    logging_dir="./logs",
    logging_steps=10,
    push_to_hub=False,
)


trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=val_dataset,
    compute_metrics=compute_metrics,
)


trainer.train()

model.save_pretrained("finetuned_bert")
tokenizer.save_pretrained("finetuned_bert")

print("Model training complete! Fine-tuned BERT model saved in 'fine_tuned_bert'")
