import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

function SecondWelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/serenitylogo.png")}
          style={styles.logo}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.mainText}>Welcome to the ultimate</Text>
        <Text style={styles.mainText}>Serenity AI</Text>
        <Text style={styles.subtitle}>
          Your mindful mental health AI companion for everyone, anywhere
        </Text>
      </View>

      <View style={styles.imageContainer}>
        <Image source={require("../assets/wel.png")} style={styles.mainImage} />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => navigation.navigate("SignUpScreen")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
          <View style={styles.arrowContainer}>
            <Text style={styles.arrowText}>→</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.signInText}>
          Already have an account?{" "}
          <Text
            style={styles.signInLink}
            onPress={() => navigation.navigate("SignInScreen")}
          >
            Sign in
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF5ED",
    paddingTop: 20,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: 20,
  },
  mainText: {
    fontSize: 30,
    color: "#3a145d",
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#8b7575",
    textAlign: "center",
    marginTop: 10,
  },
  imageContainer: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  mainImage: {
    width: "120%",
    height: "120%",
    resizeMode: "contain",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  getStartedButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#3a145d",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  arrowContainer: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  signInText: {
    fontSize: 14,
    color: "#8C8C8C",
    textAlign: "center",
  },
  signInLink: {
    color: "#6d5a5a",
    fontWeight: "bold",
  },
});

export default SecondWelcomeScreen;
