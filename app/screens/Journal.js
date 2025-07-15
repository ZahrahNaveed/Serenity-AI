import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../Firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const API_URL = "http://192.168.10.6:5000/analyze";

const JournalScreen = ({ navigation }) => {
  const [situation, setSituation] = useState("");
  const [thoughts, setThoughts] = useState("");
  const [emotions, setEmotions] = useState("");
  const [alternativeThoughts, setAlternativeThoughts] = useState("");
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "journalEntries"));
      const journalData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEntries(journalData);
    } catch (error) {
      console.error("Error loading journal entries:", error);
    }
  };

  const saveEntry = async () => {
    if (!situation.trim() || !thoughts.trim() || !emotions.trim()) {
      Alert.alert("Missing Fields", "Please fill in all required fields.");
      return;
    }

    const newEntry = {
      situation,
      thoughts,
      emotions,
      alternativeThoughts,
      cognitive_distortion: "Analyzing...",
      timestamp: new Date().toISOString(),
    };

    try {
      const docRef = await addDoc(collection(db, "journalEntries"), newEntry);
      const entryId = docRef.id;

      setEntries((prevEntries) => [
        ...prevEntries,
        { id: entryId, ...newEntry },
      ]);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ thoughts, id: entryId }),
      });
      const data = await response.json();
      const detectedDistortion = data.cognitive_distortion;

      const entryRef = doc(db, "journalEntries", entryId);
      await updateDoc(entryRef, { cognitive_distortion: detectedDistortion });

      setEntries((prevEntries) =>
        prevEntries.map((entry) =>
          entry.id === entryId
            ? { ...entry, cognitive_distortion: detectedDistortion }
            : entry
        )
      );

      setSituation("");
      setThoughts("");
      setEmotions("");
      setAlternativeThoughts("");
    } catch (error) {
      console.error("Error saving entry:", error);
    }
  };

  const deleteEntry = async (id) => {
    try {
      await deleteDoc(doc(db, "journalEntries", id));
      setEntries(entries.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  const confirmDelete = (id) => {
    Alert.alert("Delete Entry", "Are you sure you want to delete this entry?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: () => deleteEntry(id), style: "destructive" },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>CBT Thought Journal</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={styles.profileIcon}
        >
          <Ionicons name="person-circle-outline" size={30} color="#3a145d" />
        </TouchableOpacity>
      </View>

      <FlatList
        ListHeaderComponent={
          <View style={styles.contentContainer}>
            <TextInput
              style={styles.input}
              placeholder="Describe the situation..."
              value={situation}
              onChangeText={setSituation}
              multiline
            />
            <TextInput
              style={styles.input}
              placeholder="What were your thoughts?"
              value={thoughts}
              onChangeText={setThoughts}
              multiline
            />
            <TextInput
              style={styles.input}
              placeholder="How did you feel?"
              value={emotions}
              onChangeText={setEmotions}
              multiline
            />
            <TextInput
              style={styles.input}
              placeholder="What could be an alternative thought?"
              value={alternativeThoughts}
              onChangeText={setAlternativeThoughts}
              multiline
            />

            <TouchableOpacity style={styles.addButton} onPress={saveEntry}>
              <Text style={styles.addButtonText}>Save Entry</Text>
            </TouchableOpacity>
          </View>
        }
        data={entries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.entryContainer}>
            <View style={styles.entryTextContainer}>
              <Text style={styles.entryTitle}>Situation:</Text>
              <Text style={styles.entryText}>{item.situation}</Text>
              <Text style={styles.entryTitle}>Thoughts:</Text>
              <Text style={styles.entryText}>{item.thoughts}</Text>
              <Text style={styles.entryTitle}>Emotions:</Text>
              <Text style={styles.entryText}>{item.emotions}</Text>
              <Text style={styles.entryTitle}>Alternative Thought:</Text>
              <Text style={styles.entryText}>{item.alternativeThoughts}</Text>
              <Text style={styles.entryTitle}>Cognitive Distortion:</Text>
              <Text style={styles.entryText}>
                {item.cognitive_distortion || "Analyzing..."}
              </Text>
            </View>
            <TouchableOpacity onPress={() => confirmDelete(item.id)}>
              <Ionicons name="trash-outline" size={22} color="red" />
            </TouchableOpacity>
          </View>
        )}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FBF5ED" },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  header: { fontSize: 22, fontWeight: "bold", color: "#3a145d" },
  contentContainer: { paddingHorizontal: 20, paddingTop: 10 },
  input: {
    backgroundColor: "#F1F1F1",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  addButton: {
    backgroundColor: "#3a145d",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  entryContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  entryTextContainer: { flex: 1 },
  entryTitle: { fontSize: 16, fontWeight: "bold", color: "#333" },
  entryText: { fontSize: 14, color: "#555", marginBottom: 5 },
});

export default JournalScreen;
