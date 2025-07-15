import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

// Import Screens
import WelcomeScreen from "../screens/WelcomeScreen";
import SecondWelcomeScreen from "../screens/Welcome1";
import SignInScreen from "../screens/SignIn";
import SignUpScreen from "../screens/SignUp";

import FirstAssessmentPage from "../screens/assessment1";
import SecondAssessmentPage from "../screens/assessment2";
import ThirdAssessmentPage from "../screens/assessment3";
import FourthAssessmentPage from "../screens/assessment4";
import FifthAssessmentPage from "../screens/assessment5";
import SixthAssessmentPage from "../screens/assessment6";
import SeventhAssessmentPage from "../screens/assessment7";
import EighthAssessmentPage from "../screens/assessment8";
import NinthAssessmentPage from "../screens/assessment9";
import TenthAssessmentPage from "../screens/assessment10";
import MoodTrackerScreen from "../screens/MoodTrackerScreen";
import NotificationScreen from "../screens/NotificationScreen";
import YourExercises from "../screens/YourExercises";
import PreviousConversations from "../screens/MyConversations";
import Home from "../screens/Home";
import JournalScreen from "../screens/Journal";

import ProfileScreen from "../screens/ProfileScreen.js";
import AITherapyChatbot from "../screens/chatbot";
import LearnCBT from "../screens/LearnCBT";
import CBTDetails from "../screens/CBTDetails";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 🚀 **Bottom Tab Navigation**
const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#3B1E54",
          height: 50,
          paddingBottom: 5,
          paddingTop: 5,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ size }) => (
            <FontAwesome name="home" size={size} color="#cbc8d1" />
          ),
        }}
      />
      <Tab.Screen
        name="Chatbot"
        component={AITherapyChatbot}
        options={{
          tabBarIcon: ({ size }) => (
            <FontAwesome name="comment" size={size} color="#cbc8d1" />
          ),
        }}
      />
      <Tab.Screen
        name="Journal"
        component={JournalScreen}
        options={{
          tabBarIcon: ({ size }) => (
            <FontAwesome name="book" size={size} color="#cbc8d1" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ size }) => (
            <FontAwesome name="user" size={size} color="#cbc8d1" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// 🚀 **Stack Navigator**
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Onboarding & Authentication */}
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen
          name="SecondWelcomeScreen"
          component={SecondWelcomeScreen}
        />
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />

        <Stack.Screen
          name="FirstAssessmentPage"
          component={FirstAssessmentPage}
        />
        <Stack.Screen
          name="SecondAssessmentPage"
          component={SecondAssessmentPage}
        />
        <Stack.Screen
          name="ThirdAssessmentPage"
          component={ThirdAssessmentPage}
        />
        <Stack.Screen
          name="FourthAssessmentPage"
          component={FourthAssessmentPage}
        />
        <Stack.Screen
          name="FifthAssessmentPage"
          component={FifthAssessmentPage}
        />
        <Stack.Screen
          name="SixthAssessmentPage"
          component={SixthAssessmentPage}
        />
        <Stack.Screen
          name="SeventhAssessmentPage"
          component={SeventhAssessmentPage}
        />
        <Stack.Screen
          name="EighthAssessmentPage"
          component={EighthAssessmentPage}
        />
        <Stack.Screen
          name="NinthAssessmentPage"
          component={NinthAssessmentPage}
        />
        <Stack.Screen
          name="TenthAssessmentPage"
          component={TenthAssessmentPage}
        />

        <Stack.Screen name="profile" component={ProfileScreen} />

        <Stack.Screen name="MainApp" component={BottomTabs} />
        <Stack.Screen name="AITherapyChatbot" component={AITherapyChatbot} />
        <Stack.Screen name="LearnCBT" component={LearnCBT} />
        <Stack.Screen name="CBTDetails" component={CBTDetails} />
        <Stack.Screen name="JournalScreen" component={JournalScreen} />
        <Stack.Screen name="MoodTrackerScreen" component={MoodTrackerScreen} />
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
        />
        <Stack.Screen name="YourExercises" component={YourExercises} />
        <Stack.Screen
          name="PreviousConversations"
          component={PreviousConversations}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
