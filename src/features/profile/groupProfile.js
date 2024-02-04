import React, { useRef } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Button from "../../components/button";
import BottomSheet from "@gorhom/bottom-sheet";
import { useSelector } from "react-redux";
import Close from "../../assets/icons/close.png";
import { selectUserById } from "../auth/usersSlice";

function EditGroup({ route }) {
  const userId = useSelector(selectUserById);
  const { groupName } = route.params;

  const bottomSheetRef = useRef(null);

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
            <Text>Created by: Yassine Elmellouki</Text>
            <Button style={styles.deleteBtn}>Request</Button>
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
