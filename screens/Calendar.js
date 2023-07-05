import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

const { height } = Dimensions.get("window");
const START_HEIGHT = height * 0.05;
const END_HEIGHT = height * 0.24;

const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

const getCurrentWeek = (date) => {
  const weekStart = date.getDate() - date.getDay();
  const week = Array.from(
    { length: 7 },
    (v, i) => new Date(date.getFullYear(), date.getMonth(), weekStart + i)
  );
  return week;
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [allWeeks, setAllWeeks] = useState([]);
  const [isScrollable, setIsScrollable] = useState(false);
  const panelHeight = useSharedValue(START_HEIGHT);
  const [viewMode, setViewMode] = useState("week");
  const [selectedWeek, setSelectedWeek] = useState(
    getCurrentWeek(selectedDate)
  );

  const getAllWeeksInYear = (year) => {
    const dateInFirstWeek = new Date(year, 0, 1);
    while (dateInFirstWeek.getDay() !== 0) {
      dateInFirstWeek.setDate(dateInFirstWeek.getDate() - 1);
    }

    const weeksInYear = [];
    while (dateInFirstWeek.getFullYear() <= year) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        week.push(new Date(dateInFirstWeek));
        dateInFirstWeek.setDate(dateInFirstWeek.getDate() + 1);
      }
      weeksInYear.push(week);
    }

    return weeksInYear;
  };

  useEffect(() => {
    const weeks = getAllWeeksInYear(selectedDate.getFullYear());
    setAllWeeks(weeks);
    const index = findCurrentWeekIndex(weeks); // Find index of the current week
    setInitialScrollIndex(index); // Set initial index
  }, [selectedDate]);

  useEffect(() => {
    setSelectedWeek(getCurrentWeek(selectedDate)); // Add this line
  }, [selectedDate]);

  useEffect(() => {
    scrollToSelectedWeek(allWeeks);
  }, [allWeeks, scrollToSelectedWeek]);

  const flatListRef = useRef();

  const findCurrentWeekIndex = (weeks) => {
    const index = weeks.findIndex((week) =>
      week.some(
        (d) =>
          d.getFullYear() === currentDate.getFullYear() &&
          d.getMonth() === currentDate.getMonth() &&
          d.getDate() === currentDate.getDate()
      )
    );
    return index;
  };

  const scrollToSelectedWeek = useCallback(
    (weeks) => {
      if (weeks.length === 0) return; // Add this line

      const index = weeks.findIndex((week) =>
        week.some(
          (d) =>
            d.getFullYear() === selectedWeek[0].getFullYear() && // Change this line
            d.getMonth() === selectedWeek[0].getMonth() && // Change this line
            d.getDate() === selectedWeek[0].getDate() // Change this line
        )
      );

      if (index !== -1 && flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: index,
          animated: true,
          viewPosition: 0,
        });
      }
    },
    [selectedWeek] // Change this line
  );

  const selectDate = useCallback((date) => {
    setSelectedDate(date);
    setCurrentDate(date);
  }, []);

  const [initialScrollIndex, setInitialScrollIndex] = useState(
    findCurrentWeekIndex(allWeeks)
  );

  const Week = ({ week, selectedDate }) => (
    <View style={styles.weekContainer}>
      {week.map((date, index) => (
        <TouchableOpacity
          key={index}
          style={styles.cell}
          onPress={() => selectDate(date)}
        >
          <Text
            style={[
              styles.dateText,
              date.getTime() === selectedDate.getTime() && styles.selectedDate,
            ]}
          >
            {date.getDate()}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const WeekView = ({ week, selectedDate }) => (
    <View style={styles.weekContainer}>
      {week.map((date, index) => (
        <TouchableOpacity
          key={index}
          style={styles.cell}
          onPress={() => selectDate(date)}
        >
          <Text
            style={[
              styles.dateText,
              date.getTime() === selectedDate.getTime() && styles.selectedDate,
            ]}
          >
            {date.getDate()}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  // Pan gesture handler
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startHeight = panelHeight.value;
    },
    onActive: (event, ctx) => {
      let newHeight = ctx.startHeight + event.translationY;
      newHeight = Math.max(START_HEIGHT, newHeight);
      newHeight = Math.min(END_HEIGHT, newHeight);
      panelHeight.value = newHeight;
      if (!isScrollable) {
        runOnJS(setIsScrollable)(true);
        runOnJS(setViewMode)("month"); // set view mode to month here
      }
    },
    onEnd: (_) => {
      if (panelHeight.value > (START_HEIGHT + END_HEIGHT) / 2) {
        panelHeight.value = withSpring(END_HEIGHT, {
          damping: 20,
          stiffness: 100,
        });
      } else {
        panelHeight.value = withSpring(START_HEIGHT, {
          damping: 20,
          stiffness: 100,
        });
        if (isScrollable) {
          runOnJS(setIsScrollable)(false);
          runOnJS(setViewMode)("week"); // Added this line
        }
      }
    },
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: panelHeight.value,
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.monthlyContainer}>
          <Text style={styles.monthText}>JUNE</Text>
        </View>
        <View style={styles.dayContainer}>
          {daysOfWeek.map((day, index) => (
            <View key={index} style={styles.cell}>
              <Text style={styles.dayText}>{day}</Text>
            </View>
          ))}
        </View>
      </View>

      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.panel, animatedStyles]}>
          <View style={styles.dragHandle} />
          <View style={styles.containerCal}>
            {viewMode === "month" ? (
              <FlatList
                ref={flatListRef}
                data={allWeeks}
                renderItem={({ item }) => (
                  <Week week={item} selectedDate={selectedDate} />
                )}
                keyExtractor={(item, index) => index.toString()}
                scrollEnabled={isScrollable}
                initialScrollIndex={initialScrollIndex}
                getItemLayout={(data, index) => ({
                  length: 40,
                  offset: 40 * index,
                  index,
                })}
                onScrollToIndexFailed={(info) => {
                  const wait = new Promise((resolve) =>
                    setTimeout(resolve, 500)
                  );
                  wait.then(() => {
                    flatListRef.current?.scrollToIndex({
                      index: info.index,
                      animated: true,
                    });
                  });
                }}
              />
            ) : (
              <WeekView
                week={getCurrentWeek(currentDate)}
                selectedDate={selectedDate}
              />
            )}
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 150,
    width: "100%",
    backgroundColor: "black",
    justifyContent: "flex-end",
  },
  monthlyContainer: {
    alignItems: "Left",
  },
  monthText: {
    fontSize: 25,
    fontWeight: "bold",
    margin: 10,
    color: "white",
  },
  dayContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  monthContainer: {
    alignItems: "center",
  },
  dayContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  weekContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  weeklyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cell: {
    flex: 1,
    alignItems: "center",
    height: 40,
  },
  dateText: {
    fontSize: 20,
    color: "white",
    marginBottom: 14,
    height: 25,
  },
  selectedDate: {
    color: "red",
    fontWeight: "bold",
  },
  iconContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  icon: {
    width: 20,
    height: 12,
  },
  greyText: {
    color: "grey",
  },
  panel: {
    backgroundColor: "black",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    overflow: "hidden",
  },
  dragHandle: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    width: 40,
    height: 5,
    borderRadius: 5,
    backgroundColor: "gray",
    marginVertical: 10,
  },
  containerCal: {
    height: 180,
  },
});

export default Calendar;
