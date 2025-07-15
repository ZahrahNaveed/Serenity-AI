import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Svg, { Circle } from "react-native-svg";

const SecondAssessmentPage = ({ navigation }) => {
  const [selectedGender, setSelectedGender] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [progress, setProgress] = useState(2 / 10);

  const genderOptions = [
    { id: "male", text: "Male" },
    { id: "female", text: "Female" },
    { id: "other", text: "Other" },
  ];

  const handleGenderSelection = (itemValue) => {
    setSelectedGender(itemValue);
  };

  const handleContinue = () => {
    navigation.navigate("ThirdAssessmentPage");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.progressWithTitle}>
          <View style={styles.progressContainer}>
            <Svg height="40" width="40" viewBox="0 0 40 40">
              <Circle
                cx="20"
                cy="20"
                r="18"
                stroke="#e0cfa9"
                strokeWidth="3"
                fill="none"
              />

              <Circle
                cx="20"
                cy="20"
                r="18"
                stroke="#744700"
                strokeWidth="3"
                fill="none"
                strokeDasharray="113"
                strokeDashoffset={113 - progress * 113}
                strokeLinecap="round"
              />
            </Svg>
          </View>

          <Text style={styles.header}>Assessment</Text>
        </View>

        <View style={styles.notificationCircle}>
          <Text style={styles.pageIndicator}>
            {Math.round(progress * 10)} of 10
          </Text>
        </View>
      </View>

      <Text style={styles.question}>What is your gender?</Text>

      <Picker
        selectedValue={selectedGender}
        style={styles.picker}
        onValueChange={(itemValue) => handleGenderSelection(itemValue)}
      >
        {genderOptions.map((option) => (
          <Picker.Item key={option.id} label={option.text} value={option.id} />
        ))}
      </Picker>

      {/* Age Question */}
      <Text style={styles.question}>What's your age?</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        placeholder="Enter your age"
        placeholderTextColor="#b6b4b1"
      />
      <Text style={styles.question}>What's your weight?</Text>
      <TextInput
        style={styles.input}
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
        placeholder="Enter your weight in kg"
        placeholderTextColor="#b6b4b1"
      />
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue →</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF5ED",
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 10,
  },
  progressWithTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#3a145d",
  },
  notificationCircle: {
    backgroundColor: "#cbbfab",
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  pageIndicator: {
    fontSize: 14,
    color: "#744700",
  },
  question: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3a145d",
    marginVertical: 10,
    textAlign: "left",
    marginTop: 20,
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#F4F2FC",
    borderRadius: 60,
    fontSize: 18,
    color: "#3a145d",
    fontWeight: "bold",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  input: {
    backgroundColor: "#F4F2FC",
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 15,
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: "#3a145d",
    borderRadius: 30,
    paddingVertical: 20,
    alignItems: "center",
    marginBottom: 180,
    width: "100%",
    marginTop: 80,
  },
  continueButtonText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default SecondAssessmentPage;
