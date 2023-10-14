import React from "react";
import { FlatList, View, Image } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Card from "../../components/card";
import Button from "../../components/button";
import { chatListStyles, dashboardStyles } from "../../styles/styles";
import search from "../../assets/icons/search.png";
import profile from "../../assets/icons/profilepic.png";
import addgroup from "../../assets/icons/add.png";
import logo from "../../assets/icons/logo3.png";

import { useSelector } from "react-redux";
import { useFetchGroupsQuery } from "../../api/usersApi";
import { selectUserById } from "../auth/usersSlice";

const Dashboard = ({ navigation }) => {
  const userId = useSelector(selectUserById);
  const { data } = useFetchGroupsQuery({ userId });
  const groups = data?.groups;
  const handleSearchTap = () => {
    navigation.navigate("SearchScreen");
  };

  const handleProfileTap = () => {
    navigation.openDrawer();
  };

  const handleGroupTap = (groupName, groupId) => {
    navigation.navigate("Group", { groupName, groupId });
  };

  const handleAddGroupTap = () => {
    navigation.navigate("AddGroup");
  };

  const renderItem = ({ item }) => (
    <View style={{ flex: 1 }}>
      <Card
        fitspaceName={item.name}
        imageSource={require("../../assets/trainer.jpg")}
        onPress={() => handleGroupTap(item.name, item.id)}
      />
    </View>
  );

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={{ ...chatListStyles.container, marginBottom: -insets.bottom }}
    >
      <View style={dashboardStyles.titleContainer}>
        <View style={dashboardStyles.iconGroup}>
          <Button
            onPress={handleProfileTap}
            imgSource={profile}
            style={dashboardStyles.profileImage1}
            imgStyle={dashboardStyles.profileImage}
          />
        </View>
        <View style={dashboardStyles.iconGroup}>
          <Image source={logo} style={dashboardStyles.profileImage1} />
        </View>
        <View style={dashboardStyles.iconGroup}>
          <Button
            onPress={handleSearchTap}
            style={dashboardStyles.iconContainer}
            imgSource={search}
            imgStyle={dashboardStyles.image}
          />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={groups}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={groups?.length === 1 ? 1 : 2}
          key={groups?.length === 1 ? "singleColumn" : "doubleColumn"}
        />

        <Button
          onPress={handleAddGroupTap}
          style={dashboardStyles.addGroupButton}
          imgSource={addgroup}
          imgStyle={dashboardStyles.addGroupIcon}
        />
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
