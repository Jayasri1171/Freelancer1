import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import PagerView from "react-native-pager-view";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

const HistoryPage = () => {
  const [activeTab, setActiveTab] = useState(0); // 0=COMPLETED, 1=ONGOING, 2=REQUESTS
  const pagerRef = useRef(null);
   const route = useRoute();
  const { loginData } = route.params;

  const tabs = ["COMPLETED", "ONGOING", "REQUESTS"];

  const [cards] = useState([
    {
      id: 1,
      profile: require("../../assets/Splash.png"),
      date: "July 15th 2025 - 02:15 PM",
      location: "Sriram Nagar , Paper Mill Road , RJY",
      service: "Washing Machine - Drum Replacement",
      earning: "₹1,550",
    },
    {
      id: 2,
      profile: require("../../assets/Splash.png"),
      date: "July 15th 2025 - 10:15 AM",
      location: "Sriram Nagar , Paper Mill Road , RJY",
      service: "Washing Machine - Drum Replacement",
      earning: "₹1,577",
    },
    {
      id: 3,
      profile: require("../../assets/Splash.png"),
      date: "July 14th 2025 - 10:15 AM",
      location: "Sriram Nagar , Paper Mill Road , RJY",
      service: "Washing Machine - Drum Replacement",
      earning: "₹1,691",
    },
    {
      id: 4,
      profile: require("../../assets/Splash.png"),
      date: "July 15th 2025 - 04:15 AM",
      location: "Sriram Nagar , Paper Mill Road , RJY",
      service: "Washing Machine - Drum Replacement",
      earning: "₹1,972",
    },
  ]);

  const handleTabPress = (index) => {
    setActiveTab(index);
    pagerRef.current.setPage(index); // change pager page
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>
          <Text style={styles.headerBold}>{loginData.data.name || "User"}! Your Works</Text>
        </Text>
        <MaterialIcons name="notifications-none" size={24} color="#222" />
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
                  <MaterialIcons name="calendar-today" size={16} color="#222" />
                  <Text style={styles.cardDetailText}>{item.date}</Text>
                </View>
                <View style={styles.cardRow}>
                  <MaterialIcons name="location-on" size={16} color="#222" />
                  <Text style={styles.cardDetailText}>{item.location}</Text>
                </View>
                <View style={styles.cardRow}>
                  <MaterialIcons name="build" size={16} color="#222" />
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
              source={require("../../assets/Splash.png")}
              style={styles.profileImg}
            />
            <View style={styles.cardDetails}>
              <View style={styles.cardRow}>
                <MaterialIcons name="calendar-today" size={16} color="#222" />
                <Text style={styles.cardDetailText}>
                  Aug 15th 2025 - 10:15 AM
                </Text>
              </View>
              <View style={styles.cardRow}>
                <MaterialIcons name="location-on" size={16} color="#222" />
                <Text style={styles.cardDetailText}>
                  Sriram Nagar , Paper Mill Road , RJY
                </Text>
              </View>
              <View style={styles.cardRow}>
                <Feather name="tool" size={16} color="#222" />
                <Text style={styles.cardDetailText}>
                  Washing Machine - Drum Replacement
                </Text>
              </View>
            </View>
            <View style={styles.ProgressBox}>
              <MaterialIcons name="access-time" size={22} color="#222" />
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
                gap: 18,
                marginLeft: 14,
                marginTop: 10,
              }}
            >
              <Image
                source={require("../../assets/Splash.png")}
                style={styles.profileImg}
              />
              <View style={styles.cardDetails}>
                <View style={styles.cardRow}>
                  <MaterialIcons name="calendar-today" size={16} color="#222" />
                  <Text style={styles.cardDetailText}>
                    Aug 20th 2025 - 02:00 PM
                  </Text>
                </View>
                <View style={styles.cardRow}>
                  <MaterialIcons name="location-on" size={16} color="#222" />
                  <Text style={styles.cardDetailText}>Lakshmi Nagar , RJY</Text>
                </View>
                <View style={styles.cardRow}>
                  <Feather name="tool" size={16} color="#222" />
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
  container: { flex: 1, backgroundColor: "#fff", paddingTop: "10%",justifyContent:'center', alignItems:'center' },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    marginBottom: 8,
  },
  headerText: { fontSize: 20, color: "#222", fontWeight: "400" },
  headerBold: { fontWeight: 500, fontSize: 22, color: "#222" },

  tabsRow: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 8,
    borderBottomColor: "#D7D7D7",
    borderBottomWidth: 1,
  },
  tabText: {
    fontSize: 15,
    color: "#B0B0B0",
    fontWeight: "bold",
    paddingBottom: 8,
  },
  tabActiveText: { color: "#222" },
  tabUnderline: {
    width: 60,
    height: 3,
    backgroundColor: "#222",
    borderRadius: 2,
    marginTop: 2,
  },
  tabActiveContainer: { alignItems: "center" },

  statusText: {
    fontSize: 12,
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
    padding: 12,
    marginVertical: 8,
    width: "90%",
  },
  requestcard: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#D7D7D7",
    borderRadius: 15,
    padding: 12,
    marginVertical: 8,
    width: "90%",
    gap: 15,
  },
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "black",
  },
  cardDetails: { flex: 1 },
  cardRow: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  cardDetailText: { marginLeft: 6, fontSize: 9, color: "#222" },

  earningBox: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  ProgressBox: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "25%",
    flexDirection: "column",
  },
  earningLabel: { fontSize: 12, color: "#666", fontWeight: "500" },
  earningValue: { fontSize: 16, color: "green", fontWeight: "bold" },
  tipText: { fontSize: 11, color: "#444" },

  requestBtns: { flexDirection: "row", alignItems: "center", gap: 18 },
  rejectBtn: {
    backgroundColor: "#F44336",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  acceptBtn: {
    backgroundColor: "#4CAF50",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  btnText: { color: "#fff", fontWeight: "bold", fontSize: 12 },

  page: {
    flex: 1,
    alignItems: "center",
    paddingTop: 10,
  },
});

export default HistoryPage;
