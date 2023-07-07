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
import Card from "../components/Card";
import Button from "../components/Button";
import { dashboardStyles } from "../styles/Styles";
import search from "../assets/icons/search.png";
import profile from "../assets/icons/noahprofile.png";
import addgroup from "../assets/icons/addgroup1.png";

const Dashboard = ({ navigation }) => {
  const handleSearchTap = () => {
    navigation.navigate("SearchScreen");
  };

  const handleProfileTap = () => {
    navigation.navigate("ProfileScreen");
  };

  const handleGroupTap = (groupName) => {
    navigation.navigate("Group", { groupName });
  };

  const handleAddGroupTap = () => {
    navigation.navigate("AddGroup");
  };

  const renderItem = ({ item }) => (
    <Card
      fitspaceName={item.fitspaceName}
      imageSource={item.imageSource}
      onPress={() => handleGroupTap(item.fitspaceName)}
    />
  );

  return (
    <SafeAreaView style={dashboardStyles.container} edges={["top"]}>
      {sections.map((section, index) => (
        <View key={index} style={{ flex: 1 }}>
          <View style={dashboardStyles.titleContainer}>
            <View style={dashboardStyles.iconGroup}>
              <Button
                onPress={handleProfileTap}
                imgSource={profile}
                style={dashboardStyles.profileImage1}
                imgStyle={dashboardStyles.profileImage}
              />
              <Text style={dashboardStyles.text}>{section.title}</Text>
            </View>

            <View style={dashboardStyles.iconGroup}>
              <TouchableOpacity
                style={dashboardStyles.iconContainer}
                onPress={handleSearchTap}
              >
                <Image
                  source={search}
                  resizeMode="contain"
                  style={dashboardStyles.image}
                />
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={section.data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={1}
          />
          <Button
            onPress={handleAddGroupTap}
            style={dashboardStyles.addGroupButton}
            imgSource={addgroup}
            imgStyle={dashboardStyles.addGroupIcon}
          />
        </View>
      ))}
    </SafeAreaView>
  );
};

export default Dashboard;
