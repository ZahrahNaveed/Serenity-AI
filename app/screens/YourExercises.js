import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../Firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

const colors = {
  background: "#FBF5ED",
  primary: "#3B1E54",
  secondary: "#BB9CC0",
  accent: "#CBC2FF",
  lightPink: "#E7BCDE",
  text: "#3a145d",
};

const MainContainer = styled.View`
  flex: 1;
  background-color: ${colors.background};
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${colors.text};
  margin-bottom: 20px;
  margin-top: 40px;
`;

const ExerciseCard = styled.View`
  background-color: ${colors.accent};
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 10px;
`;

const ExerciseText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.text};
`;

const StepText = styled.Text`
  font-size: 16px;
  color: ${colors.text};
  margin-left: 10px;
`;

const BackButton = styled.TouchableOpacity`
  background-color: ${colors.primary};
  padding: 10px;
  border-radius: 8px;
  align-items: center;
  margin-top: 20px;
`;

const BackButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const DoneButton = styled.TouchableOpacity`
  background-color: green;
  padding: 8px;
  border-radius: 6px;
  align-items: center;
  margin-top: 10px;
`;

const DoneButtonText = styled.Text`
  color: white;
  font-size: 14px;
  font-weight: bold;
`;

const YourExercises = () => {
  const navigation = useNavigation();
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "cbt_exercises"));
        let fetchedExercises = [];
        querySnapshot.forEach((doc) => {
          fetchedExercises.push({ id: doc.id, ...doc.data() });
        });
        setExercises(fetchedExercises);
      } catch (error) {
        console.error("Error fetching exercises: ", error);
      }
    };

    fetchExercises();
  }, []);

  const markExerciseAsDone = async (exerciseId) => {
    try {
      const exerciseRef = doc(db, "cbt_exercises", exerciseId);
      await updateDoc(exerciseRef, {
        completed: true,
      });

      // Update local state
      setExercises((prevExercises) =>
        prevExercises.map((exercise) =>
          exercise.id === exerciseId ? { ...exercise, completed: true } : exercise
        )
      );

      alert("Exercise marked as completed!");
    } catch (error) {
      console.error("Error updating exercise: ", error);
    }
  };

  return (
    <MainContainer>
      <Title>Your Personalized Exercises</Title>
      <ScrollView>
        {exercises.length > 0 ? (
          exercises.map((exercise, index) => (
            <ExerciseCard key={index}>
              <ExerciseText>{exercise.title}</ExerciseText>
              <Text>{exercise.description}</Text>
              {exercise.steps &&
                exercise.steps.map((step, i) => <StepText key={i}>🔹 {step}</StepText>)}

              {!exercise.completed ? (
                <DoneButton onPress={() => markExerciseAsDone(exercise.id)}>
                  <DoneButtonText>✅ Mark as Done</DoneButtonText>
                </DoneButton>
              ) : (
                <Text style={{ color: "green", marginTop: 10 }}>✔ Completed</Text>
              )}
            </ExerciseCard>
          ))
        ) : (
          <Text>No exercises available.</Text>
        )}
      </ScrollView>
      <BackButton onPress={() => navigation.goBack()}>
        <BackButtonText>Back</BackButtonText>
      </BackButton>
    </MainContainer>
  );
};

export default YourExercises;
