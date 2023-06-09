import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, SectionList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const EventScreen = () => {
  const [events, setEvents] = useState([]);
  const [sections, setSections] = useState([]); // New state for sections

  useEffect(() => {
    // Fetch events data from the server when the component mounts
    axios
      .get("http://localhost:3000/events")
      .then((response) => {
        // Convert the date strings into Date objects
        const eventsWithDateObjects = response.data.map((event) => {
          return {
            ...event,
            date: new Date(event.EventDate),
            EventName: event.EventName,
          };
        });

        setEvents(eventsWithDateObjects);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    // New useEffect that recalculates sections when events changes
    const newSections = events.reduce((acc, event) => {
      const eventWeekday = event.date.toLocaleString("en-US", {
        weekday: "long",
      });

      const eventMonth = event.date.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });

      const existingSection = acc.find(
        (section) => section.title === eventMonth
      );

      if (existingSection) {
        existingSection.data.push({ ...event, weekday: eventWeekday });
      } else {
        acc.push({
          title: eventMonth,
          data: [{ ...event, weekday: eventWeekday }],
        });
      }

      return acc;
    }, []);

    setSections(newSections); // Update sections state
  }, [events]); // Dependence on events

  const renderItem = ({ item }) => (
    <View style={sectionListStyles.itemContainer}>
      <View>
        <Text style={sectionListStyles.weekday}>
          {item.weekday.substring(0, 3)}
        </Text>
        <Text style={sectionListStyles.day}>{item.date.getDate()}</Text>
      </View>
      <View style={sectionListStyles.eventTitleContainer}>
        <Text style={sectionListStyles.eventTitle}>{item.EventName}</Text>
        <Text style={sectionListStyles.eventTime}>{item.time}</Text>
      </View>
    </View>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={sectionListStyles.sectionHeader}>{title}</Text>
  );

  return (
    <SafeAreaView style={calendarStyles.container}>
      <View style={calendarStyles.titleContainer}>
        <Text style={calendarStyles.text}>Calendar</Text>
      </View>
      <View style={calendarStyles.contentContainer}>
        <View style={calendarStyles.halfPage}>
          <SectionList
            sections={sections}
            keyExtractor={(item, index) => item + index}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export const sectionListStyles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  eventTitleContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 3,
    padding: 10,
    marginLeft: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  weekday: {
    fontSize: 14,
    fontWeight: "normal",
    marginRight: 5,
    minWidth: 60, // Set a minimum width for the weekday
    textAlign: "left", // Align the weekday text to the right
  },
  day: {
    fontSize: 20,
    fontWeight: "bold",
  },
  eventInfoContainer: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#F0F0F0",
    borderRadius: 5,
  },
  eventTime: {
    fontSize: 16,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export const calendarStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    paddingBottom: -40,
  },
  titleContainer: {
    flex: 0.1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 0.9,
  },
  halfPage: {
    flex: 1,
  },
});

export default EventScreen;
