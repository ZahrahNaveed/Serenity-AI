import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";

const colors = {
  background: "#FBF5ED",
  maintext: "#3a145d",
  white: "#FFFFFF",
};

const MainContainer = styled.View`
  flex: 1;
  background-color: ${colors.background};
  padding: 20px;
`;

const SectionTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.maintext};
  margin-bottom: 15px;
  margin-top: 15px;
  textalign: center;
`;

const Card = styled(TouchableOpacity)`
  background-color: ${colors.white};
  border-radius: 12px;
  margin-bottom: 15px;
  overflow: hidden;
  shadow-color: #000;
  shadow-offset: 0px 3px;
  shadow-opacity: 0.2;
  shadow-radius: 5px;
  elevation: 4;
`;

const Thumbnail = styled(Image)`
  width: 100%;
  height: 180px;
`;

const CardContent = styled.View`
  padding: 15px;
`;

const CardTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.maintext};
`;

const LearnCBT = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "cbt_videos"));
      const fetchedCategories = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Error fetching videos: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <MainContainer>
      <SectionTitle>Learn CBT</SectionTitle>
      {loading ? (
        <ActivityIndicator size="large" color={colors.maintext} />
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          refreshing={loading}
          onRefresh={fetchCategories}
          renderItem={({ item }) => (
            <Card
              onPress={() =>
                navigation.navigate("CBTDetails", {
                  title: item.title,
                  videos: item.videos || [],
                })
              }
            >
              <Thumbnail
                source={{
                  uri:
                    item.videos?.[0]?.thumbnail ||
                    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fcbt&psig=AOvVaw0S_JqU-gr1ZcNJrm-_FWmY&ust=1739652294287000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCPC9kvuDxIsDFQAAAAAdAAAAABAE",
                }}
              />
              <CardContent>
                <CardTitle>{item.title}</CardTitle>
              </CardContent>
            </Card>
          )}
        />
      )}
    </MainContainer>
  );
};

export default LearnCBT;
