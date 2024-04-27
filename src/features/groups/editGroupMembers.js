import React, { useRef, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import Button from "../../components/button";
import Profile from "../../components/profile";
import BottomSheet from "@gorhom/bottom-sheet";
import { useDispatch, useSelector } from "react-redux";
import { showOverlay, hideOverlay } from "./overlaySlice";
import Close from "../../assets/icons/close.png";
import { useFetchGroup } from "../../services/actions/groupActions";
import { useFetchUser } from "../../services/actions/userActions";

import { selectUserById } from "../auth/usersSlice";
import back from "../../assets/icons/back.png";

function EditGroup({ route, navigation }) {
  const { groupId } = route.params;
  console.log("Group ID:", groupId);
  const { data: groupProfile } = useFetchGroup(groupId);
  const {
    data: members,
    isLoading,
    error,
  } = useFetchUser(groupProfile ? groupProfile.users : []);
  console.log("Group:", groupProfile);

  const userId = useSelector(selectUserById);

  const [mainScrollEnabled, setMainScrollEnabled] = useState(true);

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
        style={styles.parentContainer}
        scrollEnabled={mainScrollEnabled}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.members}>
            <View style={styles.header}>
              <Button
                imgSource={back}
                imgStyle={styles.back}
                style={styles.back}
                onPress={() => navigation.goBack()}
              />
              <Text style={styles.membersTitle}>
                {members ? `${members.length} People` : "Loading members..."}
              </Text>
            </View>
            <View style={styles.membersContainer}>
              {members &&
                members.map((item) => (
                  <Profile
                    key={item._id}
                    name={item.username}
                    content="Last message content here"
                    onPress={handleProfilePress}
                    showForwardIcon={true}
                  />
                ))}
            </View>
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
        <Button style={styles.editMembers}>View Profile</Button>
        <Button style={styles.editMembers}>Remove Member</Button>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: "white",
    marginTop: 50,
  },
  members: {
    width: "90%",
  },
  membersTitle: {
    fontSize: 20,

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
    zIndex: 10,
  },
  editMembers: {
    alignSelf: "center",
    borderRadius: 8,
    width: "90%",
    height: 60,
    marginTop: 30,
  },
  back: {
    position: "absolute",
    left: 0,
    width: 23,
    height: 23,
    backgroundColor: "transparent",
  },
});

export default EditGroup;
