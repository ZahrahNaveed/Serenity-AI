import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

const FifthAssessmentPage = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [progress, setProgress] = useState(5 / 10);
  const navigation = useNavigation();

  const options = [
    { id: 1, text: "I often feel stuck in negative thoughts " },
    { id: 2, text: "I worry excessively about the future" },
    { id: 3, text: "I feel like I'm not good enough" },
    { id: 4, text: "My thoughts affect my sleep and energy levels" },
    { id: 5, text: "I struggle with motivation and completing tasks" },
  ];

  const handleSelection = (id) => {
    setSelectedOption(id);
  };

  const handleContinue = () => {
    navigation.navigate("SixthAssessmentPage");
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
        How are your thoughts affecting your daily life?
      </Text>

      <ScrollView
        style={styles.optionsContainer}
        indicatorStyle="#3a145d"
        showsVerticalScrollIndicator={true}
      >
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
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue →</Text>
        </TouchableOpacity>
      </View>
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
    elevation: 5,
    justifyContent: "space-between",
  },
  selectedOption: {
    backgroundColor: "#e6b7cf",
    borderColor: "#d8cfc6",
    borderWidth: 2,
  },
  optionText: {
    fontSize: 18,
    color: "#3a145d",
    fontWeight: "bold",
    marginLeft: 10,
    flexShrink: 1,
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
  circleIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#3a145d",
    justifyContent: "center",
    alignItems: "center",
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
  buttonContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
});

export default FifthAssessmentPage;
