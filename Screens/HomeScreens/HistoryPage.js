import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import PagerView from "react-native-pager-view";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";

const { width, height } = Dimensions.get("window");

const HistoryPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const pagerRef = useRef(null);
  const route = useRoute();
  const { loginData } = route.params;

  const tabs = ["COMPLETED", "ONGOING", "REQUESTS"];

  const [cards] = useState([
    {
      id: 1,
      profile: require("../../assets/Profileboy.jpg"),
      date: "July 15th 2025 - 02:15 PM",
      location: "Sriram Nagar RJY",
      service: "Washing Machine - Drum Replacement",
      earning: "₹1,550",
    },
    {
      id: 2,
      profile: require("../../assets/Profileboy.jpg"),
      date: "July 15th 2025 - 10:15 AM",
      location: "Sriram Nagar, RJY",
      service: "Washing Machine - Drum Replacement",
      earning: "₹1,577",
    },
    {
      id: 3,
      profile: require("../../assets/Profileboy.jpg"),
      date: "July 14th 2025 - 10:15 AM",
      location: "Sriram Nagar, RJY",
      service: "Washing Machine - Drum Replacement",
      earning: "₹1,691",
    },
    {
      id: 4,
      profile: require("../../assets/Profileboy.jpg"),
      date: "July 15th 2025 - 04:15 AM",
      location: "Sriram Nagar, RJY",
      service: "Washing Machine - Drum Replacement",
      earning: "₹1,972",
    },
  ]);

  const handleTabPress = (index) => {
    setActiveTab(index);
    pagerRef.current.setPage(index);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>
          <Text style={styles.headerBold}>
            {loginData.data.name || "User"}! Your Works
          </Text>
        </Text>
        <MaterialIcons name="notifications-none" size={RFValue(22)} color="#222" />
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab}
            onPress={() => handleTabPress(index)}
            style={styles.tabActiveContainer}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === index && styles.tabActiveText,
              ]}
            >
              {tab}
            </Text>
            {activeTab === index && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Swipeable Pages */}
      <PagerView
        style={{ flex: 1, width: "100%" }}
        initialPage={0}
        ref={pagerRef}
        onPageSelected={(e) => setActiveTab(e.nativeEvent.position)}
      >
        {/* COMPLETED */}
        <View key="1" style={styles.page}>
          {cards.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image source={item.profile} style={styles.profileImg} />
              <View style={styles.cardDetails}>
                <View style={styles.cardRow}>
                  <MaterialIcons name="calendar-today" size={RFValue(14)} color="#222" />
                  <Text style={styles.cardDetailText}>{item.date}</Text>
                </View>
                <View style={styles.cardRow}>
                  <MaterialIcons name="location-on" size={RFValue(14)} color="#222" />
                  <Text style={styles.cardDetailText}>{item.location}</Text>
                </View>
                <View style={styles.cardRow}>
                  <MaterialIcons name="build" size={RFValue(14)} color="#222" />
                  <Text style={styles.cardDetailText}>{item.service}</Text>
                </View>
              </View>

              <View style={styles.earningBox}>
                <Text style={styles.earningLabel}>Earning</Text>
                <Text style={styles.earningValue}>{item.earning}</Text>
                <Text style={styles.tipText}>+ Pro Tips</Text>
              </View>
            </View>
          ))}
        </View>

        {/* ONGOING */}
        <View key="2" style={styles.page}>
          <View style={styles.card}>
            <Image
              source={require("../../assets/Profileboy.jpg")}
              style={styles.profileImg}
            />
            <View style={styles.cardDetails}>
              <View style={styles.cardRow}>
                <MaterialIcons name="calendar-today" size={RFValue(14)} color="#222" />
                <Text style={styles.cardDetailText}>
                  Aug 15th 2025 - 10:15 AM
                </Text>
              </View>
              <View style={styles.cardRow}>
                <MaterialIcons name="location-on" size={RFValue(14)} color="#222" />
                <Text style={styles.cardDetailText}>
                  Sriram Nagar , Paper Mill Road , RJY
                </Text>
              </View>
              <View style={styles.cardRow}>
                <Feather name="tool" size={RFValue(14)} color="#222" />
                <Text style={styles.cardDetailText}>
                  Washing Machine - Drum Replacement
                </Text>
              </View>
            </View>
            <View style={styles.ProgressBox}>
              <MaterialIcons name="access-time" size={RFValue(20)} color="#222" />
              <Text style={styles.statusText}>Work In Progress</Text>
            </View>
          </View>
        </View>

        {/* REQUESTS */}
        <View key="3" style={styles.page}>
          <View style={styles.requestcard}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                paddingHorizontal: width * 0.04,
                marginTop: height * 0.01,
              }}
            >
              <Image
                source={require("../../assets/Profileboy.jpg")}
                style={styles.profileImg}
              />
              <View style={styles.cardDetails}>
                <View style={styles.cardRow}>
                  <MaterialIcons name="calendar-today" size={RFValue(14)} color="#222" />
                  <Text style={styles.cardDetailText}>
                    Aug 20th 2025 - 02:00 PM
                  </Text>
                </View>
                <View style={styles.cardRow}>
                  <MaterialIcons name="location-on" size={RFValue(14)} color="#222" />
                  <Text style={styles.cardDetailText}>Lakshmi Nagar , RJY</Text>
                </View>
                <View style={styles.cardRow}>
                  <Feather name="tool" size={RFValue(14)} color="#222" />
                  <Text style={styles.cardDetailText}>
                    Refrigerator - Cooling Issue
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.requestBtns}>
              <TouchableOpacity style={styles.rejectBtn}>
                <Text style={styles.btnText}>REJECT</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.acceptBtn}>
                <Text style={styles.btnText}>ACCEPT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: height * 0.05,
    justifyContent: "center",
    alignItems: "center",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.05,
    marginBottom: height * 0.01,
  },
  headerText: { fontSize: RFValue(18), color: "#222", fontWeight: "400" },
  headerBold: { fontWeight: "600", fontSize: RFValue(20), color: "#222" },

  tabsRow: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: height * 0.01,
    marginTop: height * 0.01,
    borderBottomColor: "#D7D7D7",
    borderBottomWidth: 1,
  },
  tabText: {
    fontSize: RFValue(13),
    color: "#B0B0B0",
    fontWeight: "bold",
    paddingBottom: height * 0.005,
  },
  tabActiveText: { color: "#222" },
  tabUnderline: {
    width: width * 0.15,
    height: 3,
    backgroundColor: "#222",
    borderRadius: 2,
    marginTop: height * 0.003,
  },
  tabActiveContainer: { alignItems: "center" },

  statusText: {
    fontSize: RFValue(11),
    color: "red",
    fontWeight: "500",
    marginTop: 4,
    textAlign: "center",
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D7D7D7",
    borderRadius: 15,
    padding: width * 0.03,
    marginVertical: height * 0.01,
    width: "90%",
  },
  requestcard: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#D7D7D7",
    borderRadius: 15,
    padding: width * 0.03,
    marginVertical: height * 0.01,
    width: "90%",
    gap: 15,
  },
  profileImg: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: (width * 0.12) / 2,
    marginRight: width * 0.03,
    borderWidth: 1,
    borderColor: "black",
  },
  cardDetails: { flex: 1,paddingHorizontal:5 },
  cardRow: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  cardDetailText: { marginLeft: 6, fontSize: RFValue(10), color: "#222" },

  earningBox: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    paddingVertical: height * 0.007,
    paddingHorizontal: width * 0.04,
    alignItems: "center",
    justifyContent: "center",
  },
  ProgressBox: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    paddingVertical: height * 0.007,
    paddingHorizontal: width * 0.04,
    alignItems: "center",
    justifyContent: "center",
    width: "28%",
    flexDirection: "column",
  },
  earningLabel: { fontSize: RFValue(11), color: "#666", fontWeight: "500" },
  earningValue: { fontSize: RFValue(14), color: "green", fontWeight: "bold" },
  tipText: { fontSize: RFValue(10), color: "#444" },

  requestBtns: { flexDirection: "row", alignItems: "center", gap: 18 },
  rejectBtn: {
    backgroundColor: "#F44336",
    paddingVertical: height * 0.007,
    paddingHorizontal: width * 0.04,
    borderRadius: 6,
  },
  acceptBtn: {
    backgroundColor: "#4CAF50",
    paddingVertical: height * 0.007,
    paddingHorizontal: width * 0.04,
    borderRadius: 6,
  },
  btnText: { color: "#fff", fontWeight: "bold", fontSize: RFValue(11) },

  page: {
    flex: 1,
    alignItems: "center",
    paddingTop: height * 0.01,
  },
});

export default HistoryPage;
