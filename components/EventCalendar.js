import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";

const events = {
  "2023-05-15": [
    { name: "Field Training", time: "3:00-4:00pm", location: "Tuscarora High" },
  ],
  "2023-05-18": [
    { name: "Basketball Game", time: "6:00-8:00pm", location: "Central High" },
  ],
};

const EventCalendar = () => {
  const onDayPress = (day) => {
    console.log("Day pressed:", day);
  };

  const renderDay = (day) => {
    const date = day.dateString;
    const eventList = events[date] || [];

    return (
      <TouchableOpacity onPress={() => onDayPress(day)}>
        <View style={styles.dayContainer}>
          <Text style={styles.dayNumber}>{day.day}</Text>
          {eventList.map((event, index) => (
            <View key={index} style={styles.eventContainer}>
              <Text style={styles.eventName}>{event.name}</Text>
              <Text style={styles.eventTime}>{event.time}</Text>
              <Text style={styles.eventLocation}>{event.location}</Text>
            </View>
          ))}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Calendar
        theme={calendarTheme}
        dayComponent={({ date }) => renderDay(date)}
        onDayPress={onDayPress}
      />
    </View>
  );
};

const calendarTheme = {
  backgroundColor: "#ffffff",
  calendarBackground: "#ffffff",
  textSectionTitleColor: "#b6c1cd",
  textSectionTitleDisabledColor: "#d9e1e8",
  selectedDayBackgroundColor: "#00adf5",
  selectedDayTextColor: "#ffffff",
  todayTextColor: "#00adf5",
  dayTextColor: "#2d4150",
  textDisabledColor: "#d9e1e8",
  dotColor: "#00adf5",
  selectedDotColor: "#ffffff",
  arrowColor: "orange",
  monthTextColor: "blue",
  indicatorColor: "blue",
  textDayFontWeight: "300",
  textMonthFontWeight: "bold",
  textDayHeaderFontWeight: "bold",
  textDayFontSize: 16,
  textMonthFontSize: 16,
  textDayHeaderFontSize: 16,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dayContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  eventContainer: {
    backgroundColor: "lightgray",
    borderRadius: 10,
    padding: 5,
    marginTop: 5,
  },
  eventName: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 2,
  },
  eventTime: {
    fontSize: 10,
    marginBottom: 2,
  },
  eventLocation: {
    fontSize: 10,
    marginBottom: 2,
  },
});

export default EventCalendar;
