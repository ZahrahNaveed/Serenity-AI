import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { auth } from "../Firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleSignUp = async () => {
    try {
      if (!username.trim()) {
        throw new Error("Username cannot be empty.");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.trim() || !emailRegex.test(email)) {
        throw new Error("Please enter a valid email address.");
      }

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long.");
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match.");
      }

      // Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update profile with username
      await updateProfile(user, { displayName: username });

      Alert.alert("Success", "Account created successfully!");
      navigation.navigate("SignInScreen");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/serenitylogo.png")}
          style={styles.logo}
        />
      </View>

      <View style={styles.form}>
        <Text style={styles.title}>Sign Up To Serenity AI</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <View style={styles.inputWithIcon}>
            <Icon name="person" size={20} color="#524228" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              placeholderTextColor="#524228"
              value={username}
              onChangeText={setUsername}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email Address</Text>
          <View style={styles.inputWithIcon}>
            <Icon name="mail" size={20} color="#524228" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your email address"
              placeholderTextColor="#524228"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWithIcon}>
            <Icon name="lock-closed" size={20} color="#524228" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#524228"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={styles.eyeIcon}
            >
              <Icon name={passwordVisible ? "eye-off" : "eye"} size={20} color="#524228" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.inputWithIcon}>
            <Icon name="lock-closed" size={20} color="#524228" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              placeholderTextColor="#524228"
              secureTextEntry={!confirmPasswordVisible}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              style={styles.eyeIcon}
            >
              <Icon name={confirmPasswordVisible ? "eye-off" : "eye"} size={20} color="#524228" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.signInButton} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
          <Icon name="arrow-forward" size={22} color="#FFFFFF" style={styles.arrowIcon} />
        </TouchableOpacity>

        <View style={styles.linksContainer}>
          <Text style={styles.linkText}>
            Already have an account?{" "}
            <Text style={styles.link} onPress={() => navigation.navigate("SignInScreen")}>
              Sign In
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF5ED",
  },
  header: {
    width: "100%",
    backgroundColor: "#485890",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    height: 200,
  },
  logo: {
    width: 80,
    height: 80,
    tintColor: "#FFFFFF",
  },
  form: {
    flex: 2,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#3a145d",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: "#3a145d",
    marginBottom: 5,
    fontWeight: "bold",
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    height: 55,
    elevation: 2,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: "#524228",
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  signInButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3a145d",
    paddingVertical: 10,
    borderRadius: 25,
    marginVertical: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  arrowIcon: {
    marginLeft: 10,
  },
  linksContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  linkText: {
    color: "#8C8C8C",
    fontSize: 18,
  },
  link: {
    color: "#665894",
    fontWeight: "bold",
  },
});

export default SignUpScreen;
