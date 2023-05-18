import React from "react";
<<<<<<< HEAD
import { Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EventCalendar from "../components/EventCalendar";
import EventCard from "../components/EventCard";
import { SectionList } from "react-native";
=======
import { Text, SectionList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EventCalendar from "../components/EventCalendar";
import EventCard from "../components/EventCard";
import { styles } from "../styles/DashboardStyles";
>>>>>>> seen

const DashboardScreen = ({ navigation }) => {
  const handleTap = () => {
    navigation.navigate("EventDetailScreen");
  };
  const sections = [
    {
      title: "Today",
      data: [
        {
          id: 1,
          eventType: "Private",
          eventName: "Field Training",
          eventTime: "3:00-4:00pm",
          eventLocation: "Tuscarora High",
        },
        {
          id: 2,
          eventType: "Public",
          eventName: "Weight Room",
          eventTime: "4:00-5 :00pm",
          eventLocation: "Tuscarora High",
        },
      ],
    },
    {
      title: "Schedule",
      data: [
        {
          id: 3,
          component: <EventCalendar />,
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <SectionList
        showsVerticalScrollIndicator={false}
        sections={sections}
        renderItem={({ item }) =>
          item.component || (
            <EventCard
              eventType={item.eventType}
              eventName={item.eventName}
              eventTime={item.eventTime}
              eventLocation={item.eventLocation}
              onPress={handleTap}
            />
          )
        }
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.text}>{title}</Text>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.sectionListContainer}
      />
    </SafeAreaView>
  );
};

<<<<<<< HEAD
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  sectionListContainer: {
    paddingTop: 10,
    flexGrow: 1,
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

=======
>>>>>>> seen
export default DashboardScreen;
