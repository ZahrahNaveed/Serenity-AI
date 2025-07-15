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

const SixthAssessmentPage = () => {
  const [selectedMood, setSelectedMood] = useState("");
  const [progress, setProgress] = useState(6 / 10);
  const navigation = useNavigation();

  const moods = [
    { label: "Very Sad", emoji: "😭", color: "#937cce" },
    { label: "Sad", emoji: "😢", color: "#b4a7d6" },
    { label: "Neutral", emoji: "😐", color: "#dbbe9f" },
    { label: "Happy", emoji: "😊", color: "#b6d7a8" },
    { label: "Very Happy", emoji: "😂", color: "#f4cccc" },
    { label: "Hopeful", emoji: "🤩", color: "#f6b26b" },
    { label: "Angry", emoji: "😡", color: "#ea9999" },
    { label: "Relaxed", emoji: "😌", color: "#cfe2f3" },
    { label: "Tired", emoji: "😴", color: "#8E8E8E" },
    { label: "Anxious", emoji: "😰", color: "#dbbe9f" },
  ];

  const handleSelection = (mood) => {
    setSelectedMood(mood.label);
  };

  const handleContinue = () => {
    navigation.navigate("SeventhAssessmentPage");
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
                stroke="#cbbfab"
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

      <Text style={styles.question}>How are you feeling today?</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.moodScroll}
      >
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood.label}
            style={[
              styles.moodOption,
              selectedMood === mood.label && { backgroundColor: mood.color },
            ]}
            onPress={() => handleSelection(mood)}
          >
            <Text style={styles.moodEmoji}>{mood.emoji}</Text>
            <Text
              style={[
                styles.moodText,
                selectedMood === mood.label && { color: "#FFF" },
              ]}
            >
              {mood.label}
            </Text>
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
  moodScroll: {
    marginVertical: 10,
  },
  moodOption: {
    backgroundColor: "#F4F2FC",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 90,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  moodEmoji: {
    fontSize: 35,
  },
  moodText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3a145d",
    marginTop: 5,
  },
  continueButton: {
    backgroundColor: "#3a145d",
    borderRadius: 30,
    paddingVertical: 20,
    alignItems: "center",
    marginBottom: 80,
    marginTop: 80,
    width: "100%",
  },
  continueButtonText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default SixthAssessmentPage;
