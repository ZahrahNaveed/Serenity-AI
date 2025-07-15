import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Linking,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";

const CBTDetails = () => {
  const route = useRoute();
  const { title } = route.params;
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "cbt_videos"));
        const videoList = querySnapshot.docs.map((doc) => doc.data());

        const matchedVideos = videoList.find((item) => item.title === title);

        if (matchedVideos && matchedVideos.videos) {
          setVideos(matchedVideos.videos);
        } else {
          console.log("No videos found for this title.");
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [title]);

  const openYouTubeVideo = (videoUrl) => {
    if (videoUrl) {
      Linking.openURL(videoUrl).catch((err) =>
        console.error("Failed to open URL:", err)
      );
    } else {
      console.error("Invalid video URL");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : videos.length > 0 ? (
        <FlatList
          data={videos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => openYouTubeVideo(item.videoUrl)}
            >
              <Image
                source={{ uri: item.thumbnail }}
                style={styles.thumbnail}
              />
              <Text style={styles.videoTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noVideos}>No videos available.</Text>
      )}
    </View>
  );
};

export default CBTDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF5ED",
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 10,
    marginTop: 30,
    color: "#3a145d",
  },
  card: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnail: {
    width: "100%",
    height: 180,
    borderRadius: 10,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    textAlign: "center",
    color: "#444",
  },
  noVideos: {
    fontSize: 16,
    textAlign: "center",
    color: "gray",
    marginTop: 20,
  },
});
