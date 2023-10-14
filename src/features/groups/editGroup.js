import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Button from "../../components/button";
import Profile from "../../components/profile";
import BottomSheet from "@gorhom/bottom-sheet";
import { useDispatch, useSelector } from "react-redux";
import { showOverlay, hideOverlay } from "./overlaySlice";
import Close from "../../assets/icons/close.png";
import { useAddGroupMutation } from "../../api/groupsApi";
import { selectUserById } from "../auth/usersSlice";

function EditGroup({ route, navigation }) {
  const userId = useSelector(selectUserById);
  console.log("editgroup userid:", userId);
  const [deleteGroup] = useAddGroupMutation();
  const { groupName } = route.params;
  const [mainScrollEnabled, setMainScrollEnabled] = useState(true);

  const handleDeleteGroup = async () => {
    try {
      await deleteGroup({ name, userId });
      navigation.replace("Group", { groupName: name });
    } catch (err) {
      console.log("Add Group Error: ", err);
    }
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

  // Sample list of members
  const members = [
    { id: "1", name: "Seen Elm" },
    { id: "2", name: "Noah Gross" },
    { id: "3", name: "Myah Gross" },
    { id: "4", name: "Badr Elm" },
    { id: "5", name: "Mouad Elm" },
  ];

  const handleProfilePress = () => {
    setMainScrollEnabled(false);
    bottomSheetRef.current?.expand();
    dispatch(showOverlay());
  };

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
          <Text style={styles.groupMembers}>fitspace • 5 people</Text>

          <View style={styles.members}>
            <Text style={styles.membersTitle}>5 People</Text>
            <View style={styles.membersContainer}>
              {members.map((item) => (
                <Profile
                  key={item.id}
                  name={item.name}
                  content="Last message content here"
                  onPress={handleProfilePress}
                  showForwardIcon={true}
                />
              ))}
              <TouchableOpacity style={styles.seeAllButton} onPress={() => {}}>
                <Text>Add Members</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.seeAllButton} onPress={() => {}}>
                <Text>See All Members</Text>
              </TouchableOpacity>
            </View>

            <Button style={styles.deleteBtn}>Delete Fitspace</Button>
          </View>
        </View>
        {isOverlayVisible && <View style={styles.overlay}></View>}
      </ScrollView>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={["35%"]}
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
