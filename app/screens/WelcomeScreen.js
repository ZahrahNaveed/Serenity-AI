import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

function WelcomeScreen({ navigation }) {
  useEffect(() => {
  
    const timer = setTimeout(() => {
      navigation.replace("SecondWelcomeScreen");
    }, 2000);

    return () => clearTimeout(timer); 
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/serenitylogo.png")}
        style={styles.logo}
      />
      <Text style={styles.text}>Serenity AI</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FBF5ED",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    color: "#3a145d",
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
