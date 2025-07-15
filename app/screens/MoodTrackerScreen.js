import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

// Mood labels & emojis
const moodOptions = [
  { value: 1, label: "😢 Very Sad" },
  { value: 2, label: "🙁 Sad" },
  { value: 3, label: "😐 Neutral" },
  { value: 4, label: "🙂 Happy" },
  { value: 5, label: "😃 Very Happy" }
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const MoodTrackerScreen = () => {
  const [moodHistory, setMoodHistory] = useState([3, 4, 2, 5, 1, 3, 4]);

  const logMood = (mood) => {
    if (moodHistory.length >= 7) moodHistory.shift(); // Last 7 days data store karega
    setMoodHistory([...moodHistory, mood]);

    Alert.alert("Mood Logged!", `Today's Mood: ${moodOptions.find(m => m.value === mood).label}`);
  };

  // Weekly mood average
  const averageMood =
    moodHistory.length > 0
      ? (moodHistory.reduce((a, b) => a + b, 0) / moodHistory.length).toFixed(1)
      : 0;

  // Mood Analysis & Recommendations
  const getMoodAnalysis = () => {
    if (averageMood < 2) {
      return { text: "You seem low this week. Try mindfulness & self-care!", color: "#FFBABA", suggestion: "Try deep breathing exercises" };
    } else if (averageMood < 3) {
      return { text: "Mood fluctuations detected. Maintain a healthy routine!", color: "#FFD580", suggestion: "Journaling might help!" };
    } else {
      return { text: "You're doing well! Keep up the positive habits!", color: "#C2F0C2", suggestion: "Continue your self-care routine!" };
    }
  };

  const analysis = getMoodAnalysis();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood & Depression Analysis</Text>

      {/* Mood Selection */}
      <Text style={styles.subtitle}>How are you feeling today?</Text>
      <View style={styles.moodButtons}>
        {moodOptions.map((mood) => (
          <TouchableOpacity key={mood.value} style={styles.moodButton} onPress={() => logMood(mood.value)}>
            <Text style={styles.moodText}>{mood.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Mood Summary Card */}
      <View style={[styles.card, { backgroundColor: "#EDEBFF" }]}>
        <Text style={styles.cardTitle}>Last Logged Mood</Text>
        <Text style={styles.cardText}>{moodOptions.find(m => m.value === moodHistory[moodHistory.length - 1]).label}</Text>
      </View>

      {/* Weekly Mood Analysis Card */}
      <View style={[styles.card, { backgroundColor: analysis.color }]}>
        <Text style={styles.cardTitle}>Depression Analysis</Text>
        <Text style={styles.cardText}>{analysis.text}</Text>
        <Text style={styles.suggestion}>💡 {analysis.suggestion}</Text>
      </View>

      {/* Weekly Mood Graph */}
      <LineChart
        data={{
          labels: days,
          datasets: [{ data: moodHistory }]
        }}
        width={screenWidth - 40}
        height={220}
        bezier
        chartConfig={{
          backgroundGradientFrom: "#FFF0EB",
          backgroundGradientTo: "#EDEBFF",
          color: () => "#3B1E54",
          labelColor: () => "#3B1E54",
          propsForDots: { r: "8", strokeWidth: "3", stroke: "#3B1E54" }
        }}
        style={styles.graph}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF5ED",
    alignItems: "center",
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3B1E54",
    marginBottom: 20,
    marginTop: 50
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3B1E54",
    marginBottom: 10
  },
  moodButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 10
  },
  moodButton: {
    backgroundColor: "#FFF0EB",
    padding: 10,
    borderRadius: 10,
    margin: 5
  },
  moodText: {
    fontSize: 16,
    color: "#3B1E54"
  },
  card: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center"
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3B1E54"
  },
  cardText: {
    fontSize: 16,
    color: "#3B1E54",
    marginTop: 5
  },
  suggestion: {
    fontSize: 14,
    color: "#3B1E54",
    marginTop: 5,
    fontStyle: "italic"
  },
  graph: {
    marginVertical: 10,
    borderRadius: 10
  }
});

export default MoodTrackerScreen;
