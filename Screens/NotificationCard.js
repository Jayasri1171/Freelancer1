import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const notifications = [
  {
    id: 1,
    title: "Products Delivered Successfully",
    message:
      "Your stock from the head office has arrived! All items are now available for sale.",
    time: "Now",
    date: "17/2",
    day: "Thu",
  },
  {
    id: 2,
    title: "Products Delivered Successfully",
    message:
      "Your stock from the head office has arrived! All items are now available for sale.",
    time: "Now",
    date: "17/2",
    day: "Thu",
  },
  {
    id: 3,
    title: "Products Delivered Successfully",
    message:
      "Your stock from the head office has arrived! All items are now available for sale.",
    time: "Now",
    date: "17/2",
    day: "Thu",
  },
  {
    id: 4,
    title: "Products Delivered Successfully",
    message:
      "Your stock from the head office has arrived! All items are now available for sale.",
    time: "Now",
    date: "17/2",
    day: "Thu",
  },
  {
    id: 5,
    title: "Products Delivered Successfully",
    message:
      "Your stock from the head office has arrived! All items are now available for sale.",
    time: "Now",
    date: "17/2",
    day: "Thu",
  },
];

const NotificationCard = ({ item, isHighlighted }) => (
  <View style={[styles.card, isHighlighted && styles.highlightCard]}>
    <View style={styles.row}>
      <Feather name="box" size={width * 0.07} color="#c49a6c" />
      <View style={styles.content}>
        <View style={styles.rowBetween}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.date}>
          {item.date} {item.day}
        </Text>
      </View>
    </View>
  </View>
);

const NotificationScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back-ios" size={width * 0.05} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Notification list */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <NotificationCard item={item} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: width * 0.04,
  },
  iconBtn: {
    backgroundColor: "#f6f6f6",
    padding: width * 0.025,
    borderRadius: width * 0.03,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#000",
    borderRadius: width * 0.04,
    marginBottom: width * 0.03,
    padding: width * 0.04,
    marginHorizontal: width * 0.04,
  },
  highlightCard: {
    borderWidth: 2,
    // borderColor: "#2d8cff",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  content: {
    flex: 1,
    marginLeft: width * 0.03,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: width * 0.04,
    fontWeight: "700",
    color: "#fff",
    flexShrink: 1,
  },
  time: {
    fontSize: width * 0.035,
    color: "#fff",
  },
  message: {
    fontSize: width * 0.025,
    color: "#ddd",
    marginTop: 2,
    paddingRight:50,
  },
  date: {
    fontSize: width * 0.032,
    color: "#999",
    marginTop: 6,
  },
});

export default NotificationScreen;
