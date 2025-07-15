import React, { useState } from "react";
import { auth } from "../Firebase";
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
import { signInWithEmailAndPassword } from "firebase/auth";

function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      if (!email) {
        throw new Error("Email address is required.");
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Invalid email format.");
      }

      if (!password) {
        throw new Error("Password is required.");
      }

      setLoading(true);

      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      Alert.alert("Success", "You have signed in successfully!");

      navigation.navigate("FirstAssessmentPage");
    } catch (error) {
      setLoading(false);
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
        <Text style={styles.title}>Sign In To Serenity AI</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email Address</Text>
          <View style={styles.inputWithIcon}>
            <Icon name="mail" size={20} color="#524228" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your email address"
              placeholderTextColor="#524228"
              underlineColorAndroid="transparent"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWithIcon}>
            <Icon
              name="lock-closed"
              size={20}
              color="#524228"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#524228"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={styles.eyeIcon}
            >
              <Icon
                name={passwordVisible ? "eye-off" : "eye"}
                size={20}
                color="#524228"
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.signInButton}
          onPress={handleSignIn}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Signing In..." : "Sign In"}
          </Text>
          <Text style={styles.arrowText}>→</Text>
        </TouchableOpacity>

        <View style={styles.linksContainer}>
          <Text style={styles.linkText}>
            Don’t have an account?{" "}
            <Text
              style={styles.link}
              onPress={() => navigation.navigate("SignUpScreen")}
            >
              Sign Up
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
  arrowText: {
    color: "#FFFFFF",
    fontSize: 22,
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

export default SignInScreen;
