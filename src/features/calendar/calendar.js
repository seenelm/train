import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  Fragment,
  useMemo,
} from "react";
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
import {
  daysOfWeek,
  getMonthName,
  getCurrentWeek,
  getAllWeeksInYear,
} from "./dateUtils";
import { PanGestureHandler } from "react-native-gesture-handler";
import Button from "../../components/button";
import profile from "../../assets/icons/profilepic.png";
import addEvent from "../../assets/icons/addevent.png";
import Header from "../../components/header";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const START_HEIGHT = Dimensions.get("window").height * 0.05;
const END_HEIGHT = Dimensions.get("window").height * 0.24;

const Week = React.memo(({ week, selectedDate, onSelectDate }) => (
  <View style={styles.weekContainer}>
    {week.map((date, index) => {
      // Check if the date is the first of the month
      const isFirstDayOfMonth = date.getDate() === 1;
      const monthAbbreviation = isFirstDayOfMonth
        ? date.toLocaleDateString("default", { month: "short" })
        : "";

      return (
        <TouchableOpacity
          key={index}
          style={styles.cell}
          onPress={() => onSelectDate(date)}
        >
          {/* Conditionally render the month abbreviation if it's the first day of the month */}
          {isFirstDayOfMonth && (
            <Text style={styles.monthAbbreviationText}>
              {monthAbbreviation}
            </Text>
          )}
          <Text
            style={[
              styles.dateText,
              date.getTime() === selectedDate.getTime() && styles.selectedDate,
            ]}
          >
            {date.getDate()}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
));

const Calendar = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isScrollable, setIsScrollable] = useState(false);
  const panelHeight = useSharedValue(START_HEIGHT);
  const [viewMode, setViewMode] = useState("week");
  const allWeeks = useMemo(
    () => getAllWeeksInYear(selectedDate.getFullYear()),
    [selectedDate]
  );

  useEffect(() => {
    scrollToSelectedWeek(allWeeks);
  }, [allWeeks, scrollToSelectedWeek]);

  const flatListRef = useRef();

  const findCurrentWeekIndex = (weeks) => {
    const index = weeks.findIndex((week) =>
      week.some(
        (d) =>
          d.getFullYear() === selectedDate.getFullYear() &&
          d.getMonth() === selectedDate.getMonth() &&
          d.getDate() === selectedDate.getDate()
      )
    );
    return index;
  };

  const scrollToSelectedWeek = useCallback(
    (weeks) => {
      const index = findCurrentWeekIndex(weeks);
      if (index !== -1 && flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0,
        });
      }
    },
    [findCurrentWeekIndex]
  );

  const initialScrollIndex = useMemo(
    () => findCurrentWeekIndex(allWeeks),
    [allWeeks, findCurrentWeekIndex]
  );

  const onSelectDate = useCallback((date) => {
    setSelectedDate(date);
  }, []);

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
        runOnJS(setViewMode)("month");
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
          runOnJS(setViewMode)("week");
        }
      }
    },
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: panelHeight.value,
    };
  });
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={{ ...styles.container, marginBottom: -insets.bottom }}>
      <Header
        leftComponent={
          <Fragment>
            <Button
              onPress={() => navigation.navigate("ProfileScreen")}
              imgSource={profile}
              style={styles.iconContainer}
              imgStyle={styles.profileImage}
            />
            <Text style={styles.monthText}>{getMonthName(selectedDate)}</Text>
          </Fragment>
        }
        middleComponent={null}
        rightComponent={null}
      />
      <View style={styles.dayContainer}>
        {daysOfWeek.map((day, index) => (
          <View key={index} style={styles.cell}>
            <Text style={styles.dayText}>{day}</Text>
          </View>
        ))}
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
                  <Week
                    week={item}
                    selectedDate={selectedDate}
                    onSelectDate={onSelectDate}
                  />
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
              <Week
                week={getCurrentWeek(selectedDate)}
                selectedDate={selectedDate}
                onSelectDate={onSelectDate}
              />
            )}
          </View>
        </Animated.View>
      </PanGestureHandler>
      <View style={styles.container}>
        <Button
          onPress={() => {}}
          style={styles.addGroupButton}
          imgSource={addEvent}
          imgStyle={styles.addGroupIcon}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  monthlyContainer: {
    flexDirection: "row",
  },
  monthText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
    marginLeft: 10,
  },
  dayContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
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
    color: "black",
    height: 25,
  },
  monthAbbreviationText: {
    fontSize: 10,
    color: "black",
    height: 10,
    marginTop: -10,
  },

  selectedDate: {
    color: "red",
    fontWeight: "bold",
  },
  iconContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  greyText: {
    color: "grey",
  },
  panel: {
    backgroundColor: "white",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    overflow: "hidden",
    borderColor: "lightgray",
    borderWidth: 0.5,
    borderTopWidth: 0,
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
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 25,
  },
  addGroupIcon: {
    width: 24,
    height: 24,
  },
  addGroupButton: {
    backgroundColor: "white",
    borderRadius: 30,
    width: 55,
    height: 55,
    bottom: 20,
    right: 15,
    position: "absolute", // Add this line to position it absolutely.
    alignSelf: "flex-end",
    shadowColor: "#000", // For iOS
    shadowOffset: {
      width: 0,
      height: 2, // Shadow position
    },
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 4.65, // Blur radius
  },
  iconContainer: {
    flex: 1,
    aspectRatio: 1,
    maxHeight: 45,
    maxWidth: 45,
    backgroundColor: "transparent",
    marginBottom: 10,
  },
});

export default Calendar;
