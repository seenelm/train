import React from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { sections } from "../assets/Data";
import EventCard from "../events/EventCard";
import { dashboardStyles } from "../styles/Styles";
import addIcon from "../assets/icons/plus1.png";
import bell from "../assets/icons/bell.png";

const DashboardScreen = ({ navigation }) => {
  const handleGroupTap = () => {
    navigation.navigate("Group");
  };

  const handleAddGroupTap = () => {
    navigation.navigate("AddGroup");
  };

  const renderItem = ({ item }) => (
    <EventCard
      fitspaceName={item.fitspaceName}
      imageSource={item.imageSource}
      onPress={handleGroupTap}
    />
  );

  return (
    <SafeAreaView style={dashboardStyles.container} edges={["top"]}>
      {sections.map((section, index) => (
        <View key={index} style={{ flex: 1 }}>
          <View style={dashboardStyles.titleContainer}>
            <Text style={dashboardStyles.text}>{section.title}</Text>
            <TouchableOpacity style={dashboardStyles.iconContainer}>
              <Image
                source={bell}
                resizeMode="contain"
                style={dashboardStyles.image}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={section.data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={1} // changed from 2 to 1
          />
        </View>
      ))}
      <TouchableOpacity style={dashboardStyles.fab} onPress={handleAddGroupTap}>
        <Image
          source={addIcon}
          resizeMode="contain"
          style={dashboardStyles.plus}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DashboardScreen;
