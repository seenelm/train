import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  SectionList,
  StyleSheet,
} from "react-native";

let initialEvents = [
  { key: "1", eventTitle: "Meeting with Team A", eventDate: "20-06-2023" },
  { key: "2", eventTitle: "Lunch with Client", eventDate: "23-06-2023" },
  { key: "3", eventTitle: "Project Kick-off", eventDate: "01-07-2023" },
];

const parseDate = (dateString) => {
  const [day, month, year] = dateString.split("-");
  return new Date(year, month - 1, day);
};

const renderItem = ({ item }) => (
  <View style={sectionListStyles.itemContainer}>
    <View style={sectionListStyles.eventTitleContainer}>
      <Text style={sectionListStyles.eventTitle}>{item.eventTitle}</Text>
    </View>
    <View style={sectionListStyles.eventInfoContainer}>
      <Text style={sectionListStyles.eventDate}>{item.eventDate}</Text>
      <Text style={sectionListStyles.weekday}>{item.weekday}</Text>
    </View>
  </View>
);

const renderSectionHeader = ({ section: { title } }) => (
  <Text style={sectionListStyles.sectionHeader}>{title}</Text>
);

const GroupEvents = () => {
  const [events, setEvents] = useState(
    initialEvents.map((e) => ({ ...e, date: parseDate(e.eventDate) }))
  );
  const [sections, setSections] = useState([]);

  useEffect(() => {
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

    setSections(newSections);
  }, [events]);

  return (
    <SafeAreaView style={calendarStyles.container}>
      <View style={calendarStyles.contentContainer}>
        <View style={calendarStyles.halfPage}>
          <SectionList
            sections={sections}
            keyExtractor={(item, index) => item.key + index}
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
    backgroundColor: "white",
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
    minWidth: 60,
    textAlign: "left",
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
  eventDate: {
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
    backgroundColor: "white",
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

export default GroupEvents;
