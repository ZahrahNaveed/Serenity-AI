import React from "react";
import { View, Text, FlatList } from "react-native";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";

const notifications = [
  {
    id: "1",
    title: "Mood Check-in",
    message: "Your daily mood check-in is pending.",
    time: "2h ago",
    read: false,
    icon: "smile-o",
  },
  {
    id: "2",
    title: "New CBT Exercise",
    message: "A new exercise 'Gratitude Journaling' has been added!",
    time: "5h ago",
    read: true,
    icon: "book",
  },
  {
    id: "3",
    title: "Weekly Self-Reflection",
    message: "Reminder: Complete your weekly self-reflection.",
    time: "1 day ago",
    read: false,
    icon: "bell",
  },
];

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #3a145d;
`;

const NotificationCard = styled.View`
  background-color: ${(props) => (props.read ? "#F0F0F0" : "#BB9CC0")};
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  elevation: 3;
`;

const IconContainer = styled.View`
  width: 40px;
  height: 40px;
  background-color: ${(props) => (props.read ? "#ccc" : "#FFFFFF")};
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin-right: 15px;
`;

const NotificationTextContainer = styled.View`
  flex: 1;
  
`;

const NotificationTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.read ? "#444" : "#FFFFFF")};
  margin-top: 5px;
`;

const NotificationMessage = styled.Text`
  font-size: 14px;
  color: ${(props) => (props.read ? "#666" : "#FFFFFF")};
  margin-top: 2px;
`;

const NotificationTime = styled.Text`
  font-size: 12px;
  color: ${(props) => (props.read ? "#888" : "#FFFFFF")};
  margin-top: 5px;
`;

const NotificationScreen = () => {
  return (
    <Container>
      <Title>Notifications</Title>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotificationCard read={item.read}>
            <IconContainer read={item.read}>
              <FontAwesome
                name={item.icon}
                size={20}
                color={item.read ? "#FFF" : "#BB9CC0"}
              />
            </IconContainer>
            <NotificationTextContainer>
              <NotificationTitle read={item.read}>{item.title}</NotificationTitle>
              <NotificationMessage read={item.read}>{item.message}</NotificationMessage>
              <NotificationTime read={item.read}>{item.time}</NotificationTime>
            </NotificationTextContainer>
          </NotificationCard>
        )}
      />
    </Container>
  );
};

export default NotificationScreen;
