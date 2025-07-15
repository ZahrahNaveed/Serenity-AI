import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { auth } from "../Firebase";

// Use your default profile picture
import serenityLogo from "../assets/i3.png";

const ProfileScreen = ({ route, navigation }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [userName, setUserName] = useState("User Name");
  const [userEmail, setUserEmail] = useState("useremail@gmail.com");

  // Fetch user data from Firebase Auth
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      if (user.displayName) {
        setUserName(user.displayName);
      }
      if (user.email) {
        setUserEmail(user.email);
      }
    }
  }, []);
  const [userWeight] = useState(route.params?.userWeight || "70 kg");
  const [userAge] = useState(route.params?.userAge || "25");
  const [userGender] = useState(route.params?.userGender || "Male");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: "SecondWelcomeScreen" }],
          });
        },
      },
    ]);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F2F5EB" }}>
      {/* Header Section */}
      <View
        style={{
          backgroundColor: "#4B3869",
          padding: 20,
          alignItems: "center",
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      >
        <TouchableOpacity onPress={pickImage} style={{ position: "relative" }}>
          <Image
            source={profileImage ? { uri: profileImage } : serenityLogo}
            style={{
              width: 80,
              height: 80,
              borderRadius: 50,
              borderWidth: 3,
              borderColor: "#FFFFFF",
            }}
          />
          <FontAwesome
            name="camera"
            size={24}
            color="#4B3869"
            style={{
              position: "absolute",
              bottom: 5,
              right: 5,
              backgroundColor: "#FFFFFF",
              borderRadius: 15,
              padding: 5,
            }}
          />
        </TouchableOpacity>
        {/* Display passed user name */}
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 20,
            fontWeight: "bold",
            marginTop: 10,
          }}
        >
          {userName}
        </Text>
        <Text style={{ color: "#EDEBFF", fontSize: 14 }}>{userEmail}</Text>
      </View>

      {/* User Info Section */}
      <View style={{ padding: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            backgroundColor: "#EDEBFF",
            padding: 15,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "#4B3869", fontSize: 16 }}>Age: {userAge}</Text>
          <Text style={{ color: "#4B3869", fontSize: 16 }}>
            Weight: {userWeight}
          </Text>
          <Text style={{ color: "#4B3869", fontSize: 16 }}>
            Gender: {userGender}
          </Text>
        </View>
      </View>

      {/* Settings Style Options */}
      <View style={{ padding: 20 }}>
        {[
          { title: "Personal Information", route: "PersonalInformation" },
          { title: "Emergency Contact", route: "EmergencyContact" },
          { title: "Help Center", route: "HelpCenter" },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(item.route)}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#C2B1FF",
              paddingVertical: 15,
            }}
          >
            <Text style={{ color: "#4B3869", fontSize: 16 }}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <View style={{ padding: 20, alignItems: "center" }}>
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            backgroundColor: "#4B3869",
            width: "100%",
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 16 }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
