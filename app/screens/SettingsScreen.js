import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const SettingsScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F2F5EB' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#4B3869' }}>Settings Screen</Text>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20, backgroundColor: '#C2B1FF', padding: 10, borderRadius: 10 }}>
        <Text style={{ color: '#4B3869' }}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
