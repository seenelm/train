import React, { useState } from "react";
import { FlatList, View, Image, RefreshControl } from "react-native";
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
  const { data: groups, refetch } = useFetchGroupsQuery(userId);
  console.log("Dashboard Groups: ", groups);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

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
        fitspaceName={item.groupName}
        imageSource={require("../../assets/trainer.jpg")}
        onPress={() => handleGroupTap(item.groupName, item._id)}
        groupId={item._id}
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
            style={dashboardStyles.profileImage2}
            imgStyle={dashboardStyles.profileImage}
          />
        </View>
        <View style={dashboardStyles.iconGroup}>
          <Image source={logo} style={dashboardStyles.profileImage3} />
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
          keyExtractor={(item) => item._id}
          numColumns={groups?.length === 1 ? 1 : 2}
          key={groups?.length === 1 ? "singleColumn" : "doubleColumn"}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
