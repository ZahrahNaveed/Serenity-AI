import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { collection, getDocs } from "firebase/firestore"; // 🔄 CHANGED: Import getDocs from firestore
import { auth, db } from "../Firebase";
import { useNavigation } from "@react-navigation/native";
import { Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const PreviousConversations = () => {
  const [conversations, setConversations] = useState([]);
  const navigation = useNavigation();

  const fetchConversations = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const sessionsRef = collection(db, "conversations", user.uid, "sessions");
      const querySnapshot = await getDocs(sessionsRef);

      const sessions = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        messages: docSnap.data()?.messages || [],
        summary: docSnap.data()?.summary || "", // 🔄 CHANGED: Retrieve summary field
        timestamp: docSnap.data()?.timestamp?.toDate() || null,
      }));

      // 🔄 Filter out sessions that have no user messages (only the initial bot message)
      const filteredSessions = sessions.filter(
        (session) => session.messages.length > 1
      );

      // Optional: sort sessions by timestamp descending
      filteredSessions.sort((a, b) => b.timestamp - a.timestamp);

      setConversations(filteredSessions);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const handlePress = async (sessionId) => {
    // 🔄 Fetch conversation from Firestore, then navigate with data
    try {
      const user = auth.currentUser;
      if (!user) return;

      // Instead of using sessionId.messages, we fetch the conversation:
      // (Assume here that the conversation is already saved properly)
      // For navigation, we pass the stored summary if needed.
      navigation.navigate("AITherapyChatbot", {
        sessionId: sessionId, // Pass the sessionId of the selected conversation
        // For simplicity, we pass the whole conversation message array from sessions (if available)
        // If you need to re-fetch from Firestore, you can do that in AITherapyChatbot.
        conversation:
          conversations.find((c) => c.id === sessionId)?.messages || [],
        isNewSession: false, // Indicate it's an old session
      });
    } catch (error) {
      console.error("Error fetching conversation:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Previous Conversations</Text>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item.id)}>
            <Card style={styles.conversationCard}>
              <View style={styles.cardContent}>
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={24}
                  color="white"
                />
                <Text style={styles.conversationText} numberOfLines={1}>
                  {item.summary ||
                    (item.messages.length > 0
                      ? item.messages[0].text
                      : "No messages")}
                </Text>
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FBF5ED", padding: 16 },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#4A148C",
  },
  conversationCard: {
    backgroundColor: "#6A1B9A",
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#4A148C",
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 4,
    marginVertical: 8,
    padding: 15,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  conversationText: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
    flex: 1,
  },
});

export default PreviousConversations;
