import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Svg, { Circle } from "react-native-svg";

const EighthAssessmentPage = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [progress, setProgress] = useState(8 / 10);
  const navigation = useNavigation();

  const options = [
    {
      id: 1,
      text: "Yes, one or multiple",
      icon: "checkmark-circle",
      description:
        "I'm experiencing physical pain in different places over my body",
    },
    {
      id: 2,
      text: "No Physical Pain at all",
      icon: "close-circle",
      description:
        "I'm not experiencing any physical pain in my body at all ;)",
    },
  ];

  const handleSelection = (id) => {
    setSelectedOption(id);
  };

  const handleContinue = () => {
    navigation.navigate("NinthAssessmentPage");
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

      <Text style={styles.question}>
        Are you experiencing any physical distress?
      </Text>

      <ScrollView style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.option,
              selectedOption === option.id && styles.selectedOption,
            ]}
            onPress={() => handleSelection(option.id)}
          >
            <View
              style={[
                styles.circleIndicator,
                selectedOption === option.id && styles.selectedCircle,
              ]}
            >
              {selectedOption === option.id && (
                <View style={styles.innerCircle} />
              )}
            </View>

            <View style={styles.optionContent}>
              <Ionicons
                name={option.icon}
                size={40}
                color={selectedOption === option.id ? "#ffffff" : "#3a145d"}
                style={styles.icon}
              />
              <View style={styles.textContainer}>
                <Text
                  style={[
                    styles.optionText,
                    selectedOption === option.id && styles.selectedOptionText,
                  ]}
                >
                  {option.text}
                </Text>
                <Text
                  style={[
                    styles.optionDescription,
                    selectedOption === option.id && styles.selectedOptionText,
                  ]}
                >
                  {option.description}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

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
    fontSize: 30,
    fontWeight: "bold",
    color: "#3a145d",
    marginVertical: 20,
    textAlign: "center",
  },
  optionsContainer: {
    marginVertical: 10,
    marginBottom: 30,
  },
  option: {
    backgroundColor: "#F4F2FC",
    borderRadius: 40,
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: "100%",
    alignItems: "flex-start",
    flexDirection: "row",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    position: "relative",
  },
  selectedOption: {
    backgroundColor: "#e6b7cf",
    borderColor: "#d8cfc6",
    borderWidth: 2,
  },
  optionContent: {
    flexDirection: "column",
    alignItems: "flex-start",
    flex: 1,
  },
  icon: {
    marginBottom: 10,
  },
  textContainer: {
    flexDirection: "column",
    flex: 1,
  },
  optionText: {
    fontSize: 20,
    color: "#3a145d",
    fontWeight: "bold",
    textAlign: "left",
  },
  selectedOptionText: {
    color: "#FFFFFF",
  },
  optionDescription: {
    fontSize: 16,
    color: "#827363",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "left",
  },
  continueButton: {
    backgroundColor: "#3a145d",
    borderRadius: 30,
    paddingVertical: 20,
    alignItems: "center",
    marginBottom: 80,
    width: "100%",
    marginTop: 80,
  },
  continueButtonText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
  circleIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#3a145d",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 65,
    right: 30,
  },
  selectedCircle: {
    backgroundColor: "#e6b7cf",
    borderColor: "#fff",
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#FFF",
  },
});

export default EighthAssessmentPage;
