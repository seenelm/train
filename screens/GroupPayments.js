import React from "react";
import { View, Text, Button, StyleSheet, SectionList } from "react-native";

// This is dummy data
const DATA = [
  {
    title: "Requests",
    data: ["Payment request from John", "Payment request from Alex"],
  },
  {
    title: "Upcoming due payments",
    data: ["Payment due to Netflix", "Payment due to Internet provider"],
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const GroupPayments = () => {
  return (
    <View style={styles.container}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item title={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
      />
      <Button
        title="Request Payment"
        onPress={() => console.log("Payment Requested")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
});

export default GroupPayments;
