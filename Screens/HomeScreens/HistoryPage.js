import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
  Animated,
} from "react-native";
import PagerView from "react-native-pager-view";
import { MaterialIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

const { width, height } = Dimensions.get("window");

const HistoryPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const pagerRef = useRef(null);

  const tabs = ["PRODUCTS", "COMPLETED"];

  const products = [
    { id: 1, name: "Curd Rice", price: 50, qty: 30, subtitle: "Curd Rice", image: require("../../assets/curdRice.png") },
    { id: 2, name: "Pot Curd", price: 70, qty: 30, subtitle: "Pot Curd", image: require("../../assets/potCurd.png") },
    { id: 3, name: "Pala Kova", price: 150, qty: 30, subtitle: "Pala Kova", image: require("../../assets/palakova.png") },
    { id: 4, name: "Pala Kova", price: 150, qty: 30, subtitle: "Pala Kova", image: require("../../assets/palakova.png") },
    { id: 5, name: "Pala Kova", price: 150, qty: 30, subtitle: "Pala Kova", image: require("../../assets/palakova.png") },
    { id: 6, name: "Pala Kova", price: 150, qty: 30, subtitle: "Pala Kova", image: require("../../assets/palakova.png") },
    { id: 7, name: "Pala Kova", price: 150, qty: 30, subtitle: "Pala Kova", image: require("../../assets/palakova.png") },
    { id: 8, name: "Pala Kova", price: 150, qty: 30, subtitle: "Pala Kova", image: require("../../assets/palakova.png") },
    { id: 9, name: "Curd Rice", price: 50, qty: 30, subtitle: "Curd Rice", image: require("../../assets/curdRice.png") },
    { id: 10, name: "Curd Rice", price: 50, qty: 30, subtitle: "Curd Rice", image: require("../../assets/curdRice.png") },
    { id: 11, name: "Curd Rice", price: 50, qty: 30, subtitle: "Curd Rice", image: require("../../assets/curdRice.png") },
    { id: 12, name: "Curd Rice", price: 50, qty: 30, subtitle: "Curd Rice", image: require("../../assets/curdRice.png") },
    { id: 13, name: "Curd Rice", price: 50, qty: 30, subtitle: "Curd Rice", image: require("../../assets/curdRice.png") },

  ];

  const [completedOrders, setCompletedOrders] = useState([
    {
      id: 1,
      date: "17/02/2025",
      day: "Saturday",
      time: "15:15",
      expanded: false,
      products: [
        { name: "Curd Rice", qty: 120, price: 6000, image: require("../../assets/curdRice.png") },
        { name: "Curd Rice", qty: 120, price: 6000, image: require("../../assets/curdRice.png") },
        { name: "Curd Rice", qty: 120, price: 6000, image: require("../../assets/curdRice.png") },
        { name: "Curd Rice", qty: 120, price: 6000, image: require("../../assets/curdRice.png") },
        { name: "Curd Rice", qty: 120, price: 6000, image: require("../../assets/curdRice.png") },
        { name: "Curd Rice", qty: 120, price: 6000, image: require("../../assets/curdRice.png") },
        { name: "Curd Rice", qty: 120, price: 6000, image: require("../../assets/curdRice.png") },
        { name: "Curd Rice", qty: 120, price: 6000, image: require("../../assets/curdRice.png") },
      ],
    },
    {
      id: 2,
      date: "17/02/2025",
      day: "Saturday",
      time: "15:15",
      expanded: false,
      products: [
        { name: "Pot Curd", qty: 100, price: 7000, image: require("../../assets/potCurd.png") },
      ],
    },
    {
      id: 3,
      date: "17/02/2025",
      day: "Saturday",
      time: "15:15",
      expanded: false,
      products: [
        { name: "Curd Rice", qty: 120, price: 6000, image: require("../../assets/curdRice.png") },
        { name: "Curd Rice", qty: 120, price: 6000, image: require("../../assets/curdRice.png") },
      ],
    },
    {
      id: 4,
      date: "17/02/2025",
      day: "Saturday",
      time: "15:15",
      expanded: false,
      products: [
        { name: "Pot Curd", qty: 100, price: 7000, image: require("../../assets/potCurd.png") },
      ],
    }, {
      id: 5,
      date: "17/02/2025",
      day: "Saturday",
      time: "15:15",
      expanded: false,
      products: [
        { name: "Curd Rice", qty: 120, price: 6000, image: require("../../assets/curdRice.png") },
        { name: "Curd Rice", qty: 120, price: 6000, image: require("../../assets/curdRice.png") },
      ],
    },
    {
      id: 6,
      date: "17/02/2025",
      day: "Saturday",
      time: "15:15",
      expanded: false,
      products: [
        { name: "Pot Curd", qty: 100, price: 7000, image: require("../../assets/potCurd.png") },
      ],
    },
  ]);

  const handleTabPress = (index) => {
    setActiveTab(index);
    pagerRef.current.setPage(index);
  };

  const toggleExpand = (orderId) => {
    setCompletedOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, expanded: !o.expanded } : o))
    );
  };

  /** --- Scrollbar Logic --- */
  const scrollY = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(1);
  const [visibleHeight, setVisibleHeight] = useState(1);

  const INDICATOR_HEIGHT = 80;

  const thumbHeight = visibleHeight * (visibleHeight / Math.max(contentHeight, 1));

  const translateY = scrollY.interpolate({
    inputRange: [0, Math.max(contentHeight - visibleHeight, 1)],
    outputRange: [0, Math.max(visibleHeight - thumbHeight, 1)],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>
          Kumar! <Text style={styles.headerBold}>Your List</Text>
        </Text>
        <MaterialIcons name="notifications-none" size={26} color="#000" />
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab}
            onPress={() => handleTabPress(index)}
            style={styles.tabContainer}
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

      {/* Pager */}
      <PagerView
        style={{ flex: 1, width: "100%" }}
        initialPage={0}
        ref={pagerRef}
        onPageSelected={(e) => setActiveTab(e.nativeEvent.position)}
      >
        {/* PRODUCTS */}
        <View key="1" style={styles.page}>
          <View style={{ flexDirection: "row", flex: 1, width: "90%" }}>
            <Animated.FlatList
              data={products}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              onLayout={(e) => setVisibleHeight(e.nativeEvent.layout.height)}
              onContentSizeChange={(w, h) => setContentHeight(h)}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false }
              )}
              renderItem={({ item }) => (
                <View style={styles.productRow}>
                  <Image source={item.image} style={styles.productImg} />
                  <View style={{ flex: 1, gap: 5 }}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productSubtitle}>{item.subtitle}</Text>
                    <Text style={styles.productPrice}>₹ {item.price}.00</Text>
                  </View>
                  <View style={styles.qtyBox}>
                    <TouchableOpacity style={styles.circleBtn}>
                      <Text style={styles.circleBtnText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{item.qty}</Text>
                    <TouchableOpacity style={styles.circleBtn1}>
                      <Text style={styles.circleBtnText1}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />

            {/* Custom Scrollbar */}
            <View style={[styles.scrollbarTrack, { height: visibleHeight }]}>
              <Animated.View
                style={[
                  styles.scrollbarThumb,
                  { height: thumbHeight, transform: [{ translateY }] },
                ]}
              />
            </View>
          </View>

          {/* Bottom summary */}
          <View style={styles.summaryBox}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Order Amount</Text>
              <Text style={styles.summaryValue}>₹16522.00</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery</Text>
              <Text style={styles.summaryValue}>₹150.00</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total Payment</Text>
              <Text style={styles.totalValue}>₹16672.00</Text>
            </View>
            <Text style={styles.paymentOption}>☑ Cash / PhonePe</Text>

            <TouchableOpacity style={styles.proceedBtn}>
              <Text style={styles.proceedText}>Proceed</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* COMPLETED */}
        <View key="2" style={styles.page}>
          <ScrollView showsVerticalScrollIndicator={false} style={{ width: "95%", paddingHorizontal: width * 0.025 }}>
            {completedOrders.map((order) => (
              <View key={order.id} style={styles.orderCard}>
                {order.expanded ? (
                  <>
                    <View style={{ flexDirection: "row" , gap:20 , justifyContent:"space-between"}}>
                      <View style={{ flexDirection: "column" , width:"58%" }}>
                      {order.products.map((p, idx) => (

                        <View key={idx} style={styles.expandedRow}>
                          <Image source={p.image} style={styles.expandedImg} />
                          <View style={{ flex: 1, marginRight: 10 }}>
                            <Text style={styles.expandedText}>
                              {p.name}
                            </Text>
                            <Text style={styles.expandedText}>
                              X{p.qty}
                            </Text>
                          </View>
                          <Text style={styles.expandedPrice}>₹{p.price}.00</Text>
                        </View>
                      ))}
                      </View>
                      <View style={styles.orderFooter}>
                        <Text style={styles.dateText}>
                          Date: {order.date}{"\n"}Day: {order.day}{"\n"}Time: {order.time}
                        </Text>
                        <TouchableOpacity
                          style={styles.viewBtn}
                          onPress={() => toggleExpand(order.id)}
                        >
                          <Text style={styles.viewText}>View List ▲</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                ) : (
                  <View style={styles.orderRow}>
                    <Image
                      source={order.products[0].image}
                      style={styles.orderImg}
                    />
                    <Text style={styles.dateText}>
                      Date: {order.date}{"\n"}Day: {order.day}{"\n"}Time: {order.time}
                    </Text>
                    <TouchableOpacity
                      style={styles.viewBtn}
                      onPress={() => toggleExpand(order.id)}
                    >
                      <Text style={styles.viewText}>View List ▼</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: height * 0.02 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.05,
    paddingBottom: width * 0.04,
  },
  headerText: { fontSize: RFValue(16), color: "#000" },
  headerBold: { fontWeight: "bold", fontSize: RFValue(18) },

  tabsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tabText: { fontSize: RFValue(13), color: "#aaa", fontWeight: "bold" },
  tabActiveText: { color: "#000" },
  tabUnderline: {
    width: width * 0.2,
    height: 2,
    backgroundColor: "#000",
    marginTop: 4,
  },
  tabContainer: { alignItems: "center" },

  page: { flex: 1, alignItems: "center", paddingTop: 10 },

  productRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    width: width * 0.95,
    alignSelf: "center",
  },

  productImg: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 18,
  },

  productName: {
    fontSize: RFValue(13),
    fontWeight: "600",
    color: "#000",
  },

  productSubtitle: {
    fontSize: RFValue(10),
    color: "grey",
    marginTop: 2,
  },

  productPrice: {
    fontSize: RFValue(12),
    color: "#444",
    marginTop: 2,
    fontWeight: "600",

  },

  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },

  circleBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },

  circleBtn1: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  },


  circleBtnText: {
    fontSize: RFValue(12),
    fontWeight: "bold",
    color: "#000",
  },

  circleBtnText1: {
    fontSize: RFValue(12),
    // fontWeight: "bold",
    color: "white",
  },
  qtyText: {
    marginHorizontal: 8,
    fontSize: RFValue(12),
    fontWeight: "600",
    color: "#000",
  },

  summaryBox: { padding: 15, width: "90%" },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3,
    borderBottomColor: "black",
    borderStyle: "dashed",
    borderBottomWidth: 2,
    paddingVertical: 15,
  },
  summaryLabel: { fontSize: RFValue(13), color: "#444", fontWeight: "600" },
  summaryValue: { fontSize: RFValue(13), fontWeight: "600" },
  totalLabel: { fontSize: RFValue(13), fontWeight: "600" },
  totalValue: { fontSize: RFValue(13), fontWeight: "600" },

  paymentOption: { marginVertical: 20, fontSize: RFValue(13), color: "#000", fontWeight: "600" },
  proceedBtn: {
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
  },
  proceedText: { color: "#fff", fontWeight: "bold", fontSize: RFValue(13) },

  orderCard: {
    backgroundColor: "#D9D9D9",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginVertical: 8,
    padding: 10,
    width: "100%",
    alignSelf: "center",

  },
  orderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "red",
  },
  orderImg: { width: 55, height: 55, borderRadius: 8 },
  dateText: { fontSize: RFValue(11), color: "#222", flexShrink: 1, fontWeight: "600" },

  viewBtn: {
    backgroundColor: "#000",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  viewText: { color: "#fff", fontSize: RFValue(11) },

  expandedRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  expandedImg: { width: 40, height: 40, borderRadius: 8, marginRight: 10 },
  expandedText: { flex: 1, fontSize: RFValue(11), color: "#333" },
  expandedPrice: { fontSize: RFValue(11), fontWeight: "600" },

  orderFooter: {
    // flexDirection: "coloumn",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 8,
    gap:20,
    // alignContent:"flex-end",
    // backgroundColor:"blue"
  },

  // Custom Scrollbar
  scrollbarTrack: {
    width: 6,
    borderRadius: 3,
    backgroundColor: "#f0f0f0",
    // marginRight: 6,
  },
  scrollbarThumb: {
    width: 6,
    borderRadius: 3,
    backgroundColor: "#000",
  },
});

export default HistoryPage;
