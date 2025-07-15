import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";
import { auth } from "../Firebase";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const colors = {
  primary: "#67729D",
  white: "#FFFFFF",
  lightPeach: "#FFF0EB",
  purple: "#3B1E54",
  lightGreen: "#F2F5EB",
  background: "#FBF5ED",
  maintext: "#3a145d",
  icon: "#cbc8d1",
  navbar: "#3B1E54",
   metricsBackground: "#BB9CC0",
};

const MainContainer = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: ${colors.white};
  border-bottom-width: 1px;
  border-bottom-color: ${colors.white};
  border-radius: 60px;
  elevation: 5;
`;

const ProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ProfileImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-left: 10px;
`;

const Greeting = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${colors.maintext};
  margin-left: 10px;
`;

const NotificationButton = styled.TouchableOpacity`
  padding: 10px;
  color: ${colors.maintext};
`;

const Container = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${colors.maintext};
`;

const MetricsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  color: ${colors.maintext};
`;

const Card = styled.View`
  background-color: ${(props) => props.bgColor || colors.white};
  width: 48%;
  border-radius: 12px;
  padding: 16px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 5;
`;

const CardTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.white};
  margin-bottom: 8px;
`;

const MoodText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.white};
`;

const JournalText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.white};
`;

const TrackerContainer = styled.View`
  margin-top: 20px;
`;

const TrackerCard = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.white};
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 10px;
  elevation: 5;
`;

const TrackerTextContainer = styled.View``;

const TrackerTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.maintext};
`;

const TrackerSubtitle = styled.Text`
  font-size: 14px;
  color: ${colors.primary};
  opacity: 0.8;
`;

const FeatureContainer = styled.View`
  margin-top: 20px;
  elevation: 5;
`;

const FeatureCard = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${colors.white};
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 10px;
  elevation: 5;
`;

const FeatureImage = styled.Image`
  width: 40px;
  height: 40px;
  margin-right: 15px;
`;

const FeatureText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.primary};
  flex: 1;
`;

const FeatureIcon = styled(FontAwesome)`
  color: ${colors.maintext};
  font-size: 24px;
`;

const Home = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("User");

  useEffect(() => {
    const fetchUserData = () => {
      const user = auth.currentUser;
      if (user && user.displayName) {
        setUsername(user.displayName);
      }
    };

    fetchUserData();
  }, []);

  return (
    <MainContainer>
      <Header>
        <ProfileContainer>
          <ProfileImage
            source={{
              uri: "https://w7.pngwing.com/pngs/282/86/png-transparent-girl-lady-user-woman-famous-character-flat-icon.png",
            }}
          />
          <Greeting>Hi, {username}!</Greeting>
        </ProfileContainer>
        <NotificationButton onPress={() => navigation.navigate("NotificationScreen")}>
      <FontAwesome name="bell" size={24} color={colors.maintext} />
    </NotificationButton>
      </Header>

      <Container contentContainerStyle={{ paddingBottom: 80 }}>
      <SectionTitle>Mental Health Metrics</SectionTitle>
<MetricsContainer>
  {/* Mood Card */}
  <Card bgColor={colors.metricsBackground}>
    <CardTitle>Mood</CardTitle>
    <MoodText>😢 Very Sad</MoodText>  {/* Mood dynamically yahan show hoga */}
    <Text style={{ color: colors.white, marginTop: 5 }}>
      Tracked Mood Over Time
    </Text>
  </Card>

  {/* Journal Card */}
  <Card bgColor={colors.metricsBackground}>
    <CardTitle>Health Journal</CardTitle>
    <JournalText>12 entries this month</JournalText>  {/* Dynamically show hoga */}
    <Text style={{ color: colors.white, marginTop: 5 }}>
      Journaling helps in self-reflection
    </Text>
  </Card>
</MetricsContainer>



        <TrackerContainer>
          <SectionTitle>Mindful Journal</SectionTitle>
          <TrackerCard onPress={() => navigation.navigate("JournalScreen")}>
            <TrackerTextContainer>
              <TrackerTitle>Daily Reflections</TrackerTitle>
              <TrackerSubtitle>
                Write about your thoughts and emotions
              </TrackerSubtitle>
            </TrackerTextContainer>
          </TrackerCard>
          <SectionTitle>Mood Tracker</SectionTitle>

          <TrackerCard onPress={() => navigation.navigate("MoodTrackerScreen")}>

            <TrackerTextContainer>

              <TrackerTitle>Track Your Mood</TrackerTitle>

              <TrackerSubtitle>Monitor how you feel over time</TrackerSubtitle>
            </TrackerTextContainer>
          </TrackerCard>
        </TrackerContainer>

        <FeatureContainer>
          <SectionTitle>Explore</SectionTitle>
          <FeatureCard onPress={() => navigation.navigate("AITherapyChatbot")}>
            <FeatureImage source={{ uri: "https://via.placeholder.com/40" }} />
            <FeatureText>AI Therapy Chatbot</FeatureText>
            <FeatureIcon name="plus" />
          </FeatureCard>
          <FeatureCard onPress={() => navigation.navigate("LearnCBT")}>
            <FeatureImage source={{ uri: "https://via.placeholder.com/40" }} />
            <FeatureText>Learn CBT</FeatureText>
            <FeatureIcon name="plus" />
          </FeatureCard>
          <FeatureCard onPress={() => navigation.navigate("YourExercises")}>
            <FeatureImage source={{ uri: "https://via.placeholder.com/40" }} />
            <FeatureText>Your Exercises</FeatureText>
            <FeatureIcon name="plus" />
          </FeatureCard>
        </FeatureContainer>
      </Container>
    </MainContainer>
  );
};

export default Home;
