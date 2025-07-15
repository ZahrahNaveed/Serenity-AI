import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

const SeventhAssessmentPage = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [progress, setProgress] = useState(7 / 10);
  const navigation = useNavigation();

  const options = [
    { id: 1, text: "Yes" },
    { id: 2, text: "No" },
  ];

  const handleSelection = (id) => {
    setSelectedOption(id);
  };

  const handleContinue = () => {
    navigation.navigate("EighthAssessmentPage");
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
        Have you sought Professional help before?
      </Text>

      <View style={styles.imageContainer}>
        <Image source={require("../assets/a7.png")} style={styles.image} />
      </View>

      <View style={styles.optionsContainer}>
        <View style={styles.optionRow}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.option,
                selectedOption === option.id && styles.selectedOption,
              ]}
              onPress={() => handleSelection(option.id)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedOption === option.id && styles.selectedOptionText,
                ]}
              >
                {option.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

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
  imageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "cover",
    borderRadius: 10,
  },
  optionsContainer: {
    marginVertical: 10,
    marginBottom: 30,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  option: {
    backgroundColor: "#F4F2FC",
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 15,
    width: "45%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  selectedOption: {
    backgroundColor: "#e6b7cf",
    borderColor: "#d8cfc6",
    borderWidth: 2,
  },
  optionText: {
    fontSize: 22,
    color: "#3a145d",
    fontWeight: "bold",
    marginLeft: 10,
  },
  selectedOptionText: {
    color: "#FFFF",
    fontWeight: "bold",
  },
  continueButton: {
    backgroundColor: "#3a145d",
    borderRadius: 30,
    paddingVertical: 20,
    alignItems: "center",
    marginBottom: 80,
    width: "100%",
  },
  continueButtonText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default SeventhAssessmentPage;
