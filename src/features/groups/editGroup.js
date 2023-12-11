import React, { useRef, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Button from "../../components/button";
import Option from "../../components/option";
import BottomSheet from "@gorhom/bottom-sheet";
import { useDispatch, useSelector } from "react-redux";
import { showOverlay, hideOverlay } from "./overlaySlice";
import Close from "../../assets/icons/close.png";
import EditIcon from "../../assets/icons/setting.png";
import MembersIcon from "../../assets/icons/people.png";
import CategoriesIcon from "../../assets/icons/categories.png";
import { useAddGroupMutation, useFetchGroupQuery } from "../../api/groupsApi";
import { selectUserById } from "../auth/usersSlice";

function EditGroup({ route, navigation }) {
  const userId = useSelector(selectUserById);

  const { groupName } = route.params;
  const { groupId } = route.params;
  const [mainScrollEnabled, setMainScrollEnabled] = useState(true);

  const { data: groupProfile, refetch } = useFetchGroupQuery(groupId);
  console.log("GroupProfile", groupProfile);
  const [deleteGroup] = useAddGroupMutation();

  // Define the onPress handlers
  const handleEditGroup = () => {
    navigation.navigate("EditingGroup", { groupId: groupId });
  };

  const handleManageMembers = () => {
    console.log("Manage Members pressed");
    navigation.navigate("EditMembers");
  };

  const handleManageCategories = () => {
    console.log("Manage Categories pressed");
    // Add your logic here
  };
  const handleDeleteGroup = async () => {
    try {
      await deleteGroup({ name, userId });
      navigation.replace("Group", { groupName: name });
    } catch (err) {
      console.log("Add Group Error: ", err);
    }
  };
  const handleProfilePress = () => {
    setMainScrollEnabled(false);
    bottomSheetRef.current?.expand();
    dispatch(showOverlay());
  };

  const isOverlayVisible = useSelector((state) => state.overlay.isVisible);
  useEffect(() => {
    navigation.setOptions({
      gestureEnabled: !isOverlayVisible,
    });
  }, [isOverlayVisible, navigation]);
  useEffect(() => {
    navigation.setParams({ isOverlayVisible });
  }, [isOverlayVisible]);

  const bottomSheetRef = useRef(null);
  const dispatch = useDispatch();

  const options = [
    {
      setting: "Edit Group",
      imageSource: EditIcon,
      onPress: handleEditGroup,
    },
    {
      setting: "Manage Members",
      imageSource: MembersIcon,
      onPress: handleManageMembers,
    },
    {
      setting: "Manage Categories",
      imageSource: CategoriesIcon,
      onPress: handleManageCategories,
    },
  ];

  const handleClose = () => {
    setMainScrollEnabled(true);
    bottomSheetRef.current?.close();
    dispatch(hideOverlay());
  };

  return (
    <View style={styles.parentContainer}>
      <ScrollView
        style={{ flex: 1, backgroundColor: "white" }}
        scrollEnabled={mainScrollEnabled}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.groupImageContainer}>
            <Image
              source={require("../../assets/trainer.jpg")}
              style={styles.groupImage}
            />
          </View>
          <Text style={styles.groupName}>{groupName}</Text>
          <Text style={styles.groupMembers}>fitspace • 10 people</Text>
          <Text style={styles.groupMembers}>{groupProfile.bio}</Text>
          <View style={styles.optionsContainer}>
            {options.map((option, index) => (
              <Option
                key={index}
                setting={option.setting}
                imageSource={option.imageSource}
                onPress={option.onPress}
              />
            ))}
          </View>
          <View style={styles.members}>
            <Button style={styles.deleteBtn}>Delete Fitspace</Button>
          </View>
        </View>
        {isOverlayVisible && <View style={styles.overlay}></View>}
      </ScrollView>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={["110%"]}
        handleIndicatorStyle={styles.handleIndicator}
        backgroundStyle={styles.bottomSheet}
      >
        <View style={styles.bottomSheetHeader}>
          <Button
            onPress={handleClose}
            imgSource={Close}
            imgStyle={styles.icon}
            style={styles.closeButton}
          />
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: "white",
  },
  optionsContainer: {
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 20,
  },
  groupImageContainer: {
    width: "100%",
    alignItems: "center",
  },
  groupImage: {
    width: 150,
    height: 150,
    aspectRatio: 1,
    borderRadius: 18,
    overflow: "hidden",
  },
  groupName: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
  },
  groupMembers: {
    fontSize: 18,
    marginTop: 10,
    color: "gray",
  },
  members: {
    width: "90%",
  },
  membersContainer: {
    backgroundColor: "#F6F6F8",
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  membersTitle: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: "bold",
  },
  memberItem: {
    fontSize: 18,
    marginTop: 10,
  },
  seeAllButton: {
    marginTop: 15,
    marginBottom: 15,
    alignItems: "center",
  },
  deleteBtn: {
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#F6F6F9",
    borderRadius: 30,
    height: 35,
    width: 35,
  },
  icon: {
    height: 20,
    width: 20,
  },
  bottomSheetHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 15,
  },
  bottomSheet: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handleIndicator: {
    height: 0,
    opacity: 0,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.07)",
    zIndex: 1,
  },
});

export default EditGroup;
