import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const AITherapyChatbot = () => {
  const initialMessage = [
    {
      id: Date.now(),
      text: "Hello! I'm your AI Therapy Assistant. How are you feeling today?",
      sender: "bot",
    },
  ];

  const [messages, setMessages] = useState(initialMessage);
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]); // Stores previous conversations
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [titles, setTitles] = useState([]);

  const sendMessage = () => {
    if (input.trim() === "") return;

    const newMessage = { id: Date.now(), text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");

    setTimeout(() => {
      const botResponses = [
        "I'm here for you. Tell me more.",
        "That sounds tough. What else is on your mind?",
        "How do you feel about that?",
        "I hear you. Can you elaborate?",
      ];
      const botResponse = {
        id: Date.now(),
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1000);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const startNewConversation = () => {
    if (messages.length > 1) {
      setChatHistory([...chatHistory, messages]); // Save previous conversation
      generateTitle(messages);
    }
    setMessages(initialMessage); // Start new chat
    setSidebarVisible(false);
  };

  const generateTitle = (chat) => {
    const firstUserMessage = chat.find((msg) => msg.sender === "user");
    const newTitle = firstUserMessage
      ? firstUserMessage.text.slice(0, 20) + "..."
      : "New Conversation";
    setTitles([...titles, newTitle]);
  };

  const deleteChat = (index) => {
    Alert.alert("Delete Chat", "Are you sure you want to delete this chat?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          setChatHistory(chatHistory.filter((_, i) => i !== index));
          setTitles(titles.filter((_, i) => i !== index));
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={toggleSidebar}>
            <Ionicons name="menu" size={28} color="#3a145d" />
          </TouchableOpacity>
          <Text style={styles.header}>AI Therapy Chatbot</Text>
        </View>

        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageBubble,
                item.sender === "user" ? styles.userMessage : styles.botMessage,
              ]}
            >
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
          contentContainerStyle={styles.chatContainer}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor="#BBB"
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Ionicons name="send" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <Modal visible={sidebarVisible} animationType="slide" transparent>
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setSidebarVisible(false)}
          >
            <View style={styles.sidebar}>
              <Text style={styles.sidebarTitle}>Previous Chats</Text>

              <TouchableOpacity
                style={styles.newChatButton}
                onPress={startNewConversation}
              >
                <Text style={styles.newChatButtonText}>New Conversation</Text>
              </TouchableOpacity>

              <FlatList
                data={chatHistory}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <View style={styles.chatItem}>
                    <Text style={styles.chatText}>
                      {titles[index] || "Conversation " + (index + 1)}
                    </Text>
                    <TouchableOpacity onPress={() => deleteChat(index)}>
                      <Ionicons name="trash" size={20} color="red" />
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FBF5ED", padding: 16 },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    color: "#3a145d",
  },
  chatContainer: { flexGrow: 1, paddingBottom: 20 },
  messageBubble: {
    padding: 12,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },
  userMessage: { alignSelf: "flex-end", backgroundColor: "#F0E1FD" },
  botMessage: { alignSelf: "flex-start", backgroundColor: "#BB9CC0" },
  messageText: { color: "#3B1E54" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3B1E54",
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  input: { flex: 1, color: "#FDFFF5", fontSize: 16 },
  sendButton: {
    backgroundColor: "#67729D",
    padding: 10,
    borderRadius: 20,
    marginLeft: 8,
  },
  sidebar: {
    position: "absolute",
    height: "70%",
    width: "100%",
    backgroundColor: "#FBF5ED",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  sidebarTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  newChatButton: {
    backgroundColor: "#3a145d",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  newChatButtonText: { color: "#FFFFFF", fontWeight: "bold", fontSize: 16 },
  chatItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  chatText: { fontSize: 16, color: "#333" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "flex-end",
  },
});

export default AITherapyChatbot;
