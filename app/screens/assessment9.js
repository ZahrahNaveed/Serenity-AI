import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Svg, { Circle } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

const NinthAssessmentPage = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [progress, setProgress] = useState(9 / 10);
  const navigation = useNavigation();

  const options = [
    {
      id: 1,
      text: "Prescribed Medications",
      icon: "science",
    },
    {
      id: 2,
      text: "Over the Counter Supplements",
      icon: "healing",
    },
    {
      id: 3,
      text: "I'm not taking any",
      icon: "remove-circle-outline",
    },
    {
      id: 4,
      text: "Prefer not to say",
      icon: "cancel",
    },
  ];

  const handleSelection = (id) => {
    setSelectedOption(id);
  };

  const handleContinue = () => {
    navigation.navigate("TenthAssessmentPage");
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

      <Text style={styles.question}>Are you taking any medications?</Text>

      <View style={styles.optionsGrid}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.option,
              selectedOption === option.id && styles.selectedOption,
            ]}
            onPress={() => handleSelection(option.id)}
          >
            <MaterialIcons
              name={option.icon}
              size={30}
              color={selectedOption === option.id ? "#FFF" : "#3a145d"}
              style={styles.icon}
            />
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
    fontSize: 26,
    fontWeight: "bold",
    color: "#3a145d",
    marginVertical: 20,
    textAlign: "center",
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  option: {
    backgroundColor: "#F4F2FC",
    borderRadius: 40,
    padding: 15,
    marginBottom: 15,
    width: "48%",
    height: 180,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  selectedOption: {
    backgroundColor: "#e6b7cf",
  },
  optionText: {
    fontSize: 16,
    color: "#3a145d",
    fontWeight: "bold",
    marginTop: 100,
    alignItems: "stretch",
  },
  selectedOptionText: {
    color: "#FFF",
  },
  icon: {
    position: "absolute",
    top: 15,
    left: 20,
  },
  continueButton: {
    backgroundColor: "#3a145d",
    borderRadius: 30,
    paddingVertical: 20,
    alignItems: "center",
    marginTop: 20,
  },
  continueButtonText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default NinthAssessmentPage;
