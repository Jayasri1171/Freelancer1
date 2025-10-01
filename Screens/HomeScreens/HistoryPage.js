import React, { useState, useRef, useEffect } from "react";
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
  Alert
} from "react-native";
import PagerView from "react-native-pager-view";
import { MaterialIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useRoute } from "@react-navigation/native";
import { PaymentService } from "./paymentServie";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";



import Constants from 'expo-constants';
const { BASE_URL } = Constants.expoConfig.extra;
const API_URL_VIEW = `${BASE_URL}/api/products/view`;
const API_URL_ADD = `${BASE_URL}/api/orders/add`;


const { width, height } = Dimensions.get("window");

const HistoryPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const pagerRef = useRef(null);
  const route = useRoute();
  const { loginData } = useContext(AuthContext);

  const tabs = ["PRODUCTS", "COMPLETED"];

  const [loading, setLoading] = useState(true); // initially true


  const [products, setProducts] = useState([]);


  const [orderAmount, setOrderAmount] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(50); // example fixed charge
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    // Whenever products change, recalc totals
    const amount = products.reduce(
      (sum, p) => sum + p.price * p.qty,
      0
    );
    setOrderAmount(amount);
    setTotalPayment(amount + deliveryCharge);
  }, [products, deliveryCharge]);

  const handleIncrease = (id) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, qty: p.qty + 1 } : p
      )
    );
  };


  const handleDecrease = (id) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id && p.qty > 0 ? { ...p, qty: p.qty - 1 } : p
      )
    );
  };


  const handleCheckout = async () => {
    // const cartItems = products.filter(p => p.qty > 0);

    // if (cartItems.length === 0) {
    //   Alert.alert("Cart is empty", "Please add some products before checkout");
    //   return;
    // }

    // //   const orderPayload = {
    // //   FranchiseID: loginData.data.phone,
    // //   Location: loginData.data.location,
    // //   itemsID: cartItems.map(p => ({
    // //     ItemID: String(p.id),        // ensure string
    // //     ItemQuantity: Number(p.qty), // ensure number
    // //   })),
    // //   totalAmount: Number(totalPayment),
    // // };


    // const orderPayload = {
    //   franchiseId: loginData.data.phone,
    //   location: loginData.data.location,
    //   items: JSON.stringify(
    //     cartItems.reduce((obj, p, ind) => {
    //       obj[ind] = {
    //         itemId: String(p.id),
    //         quantity: Number(p.qty),
    //       };
    //       return obj;
    //     }, {})
    //   ),
    //   amount: totalPayment,
    // };






    // // FranchiseID, Location, itemsID, totalAmount
    // console.log(orderPayload)

    // try {
    //   const response = await fetch(
    //     API_URL_ADD,
    //     {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(orderPayload),
    //     }
    //   );

    //   // Read text first (safe even if it's HTML)
    //   const text = await response.text();
    //   console.log("Server raw response:", text);

    //   // Try JSON parse only if it’s valid JSON
    //   let data;
    //   try {
    //     data = JSON.parse(text);
    //   } catch {
    //     Alert.alert("Server Error", "Unexpected response from server.");
    //     return;
    //   }

    //   if (response.ok) {
    //     Alert.alert("Order Placed ✅", "Your order has been created!");
    //     setProducts(prev => prev.map(p => ({ ...p, qty: 0 })));
    //     setActiveTab(1);
    //     pagerRef.current?.setPage(1);
    //   } else {
    //     Alert.alert("Error", data.message || "Failed to place order.");
    //   }
    // } catch (err) {
    //   console.log(err);
    //   Alert.alert("Error", "Something went wrong while placing the order.");
    // }









    const paymentData = {
      amount: totalPayment,
      userID: loginData.data.phone
      //   currency: "INR",
      //   email: "test@example.com",
      //   phone: "9876543210",
      //   customerName: "Test User",
      //   description: "Premium subscription",
    };
    // console.log("Payment Data:", paymentData);
    const result = await PaymentService.processPayment(paymentData);

    if (result.success) {
      Alert.alert("Payment Successful", `Payment ID: ${result.paymentId}`);
    } else {
      Alert.alert("Payment Failed", result.error);
    }

  };




  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // start loading
      try {
        const response = await fetch(API_URL_VIEW, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phoneNumber: loginData.data.phone }),
        });

        const result = await response.json();

        if (result?.data && result?.images) {
          const { data, images } = result;

          const mappedProducts = Object.entries(data).map(([id, product], index) => {
            const imageUrl = images.find((url) => url.includes(product.image));

            return {
              id,
              name: product.name,
              subtitle: product.quantity || "",
              price: parseInt(product.price) || 0,
              qty: 0,
              image: { uri: imageUrl },
            };
          });

          setProducts(mappedProducts);
        }
      } catch (error) {
        console.log("Error fetching products:", error);
        Alert.alert("Error", "Failed to load products. Please try again.");
      } finally {
        setLoading(false); // stop loading
      }
    };

    fetchProducts();
  }, []);





  const [completedOrders, setCompletedOrders] = useState([]);

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


  useEffect(() => {
    const fetchCompletedOrders = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/orders/getFranchiseOrders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ franchiseId: loginData.data.phone }),
        });

        const result = await response.json();
        // console.log("Fetched Orders:", result);
        if (result?.data) {
          // Map backend data into your UI-friendly structure
          const mappedOrders = result.data.map((order) => ({
            id: order.id,
            date: new Date(order.createdAt).toLocaleDateString(),
            day: new Date(order.createdAt).toLocaleDateString('en-US', { weekday: 'long' }),
            time: new Date(order.createdAt).toLocaleTimeString(),
            expanded: false,
            products: [], // will fetch product details later
            amount: order.amount,
            completed: order.completed,
            delivered: order.delivered,
          }));

          setCompletedOrders(mappedOrders);
        }
      } catch (error) {
        console.log("Error fetching orders:", error);
        Alert.alert("Error", "Failed to load completed orders.");
      }
    };

    fetchCompletedOrders();
  }, []);


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>
          <Text style={styles.headerBold}> {loginData.data.name}! Your List</Text>
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
            {loading ? (
              // Skeleton loader
              <View style={{ width: "100%", padding: 10 }}>
                {[...Array(5)].map((_, i) => (
                  <View
                    key={i}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 12,
                    }}
                  >
                    <View
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 10,
                        backgroundColor: "#e0e0e0",
                        marginRight: 12,
                      }}
                    />
                    <View style={{ flex: 1 }}>
                      <View
                        style={{ width: "80%", height: 15, backgroundColor: "#e0e0e0", marginBottom: 6, borderRadius: 4 }}
                      />
                      <View
                        style={{ width: "60%", height: 15, backgroundColor: "#e0e0e0", borderRadius: 4 }}
                      />
                    </View>
                  </View>
                ))}
              </View>
            ) : (
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
                      <TouchableOpacity
                        style={styles.circleBtn}
                        onPress={() => handleDecrease(item.id)}
                      >
                        <Text style={styles.circleBtnText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.qtyText}>{item.qty}</Text>
                      <TouchableOpacity
                        style={styles.circleBtn1}
                        onPress={() => handleIncrease(item.id)}
                      >
                        <Text style={styles.circleBtnText1}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            )}


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
              <Text style={styles.summaryValue}>₹{orderAmount}.00</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery</Text>
              <Text style={styles.summaryValue}>₹{deliveryCharge}.00</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total Payment</Text>
              <Text style={styles.totalValue}>₹{totalPayment}.00</Text>
            </View>
            <Text style={styles.paymentOption}>☑ Cash / PhonePe</Text>

            <TouchableOpacity style={styles.proceedBtn} onPress={handleCheckout}>
              <Text style={styles.proceedText}>Proceed</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* COMPLETED */}
        <View key="2" style={styles.page}>
          <ScrollView>
            {completedOrders.map((order) => (
              <View key={order.id} style={styles.orderCard}>
                {order.expanded ? (
                  <View style={{ flexDirection: "row", gap: 20, justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "column", width: "58%" }}>
                      {order.products.map((p, idx) => (
                        <View key={idx} style={styles.expandedRow}>
                          <Image source={p.image} style={styles.expandedImg} />
                          <View style={{ flex: 1, marginRight: 10 }}>
                            <Text style={styles.expandedText}>{p.name}</Text>
                            <Text style={styles.expandedText}>X{p.qty}</Text>
                          </View>
                          <Text style={styles.expandedPrice}>₹{p.price}.00</Text>
                        </View>
                      ))}
                    </View>
                    <View style={styles.orderFooter}>
                      <Text style={styles.dateText}>
                        Date: {order.date}{"\n"}Day: {order.day}{"\n"}Time: {order.time}
                      </Text>
                      <TouchableOpacity style={styles.viewBtn} onPress={() => toggleExpand(order.id)}>
                        <Text style={styles.viewText}>View List ▲</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View style={styles.orderRow}>
                    <Image source={order.products[0]?.image || require("../../assets/Mobilehand.png")} style={styles.orderImg} />
                    <Text style={styles.dateText}>
                      Date: {order.date}{"\n"}Day: {order.day}{"\n"}Time: {order.time}
                    </Text>
                    <TouchableOpacity style={styles.viewBtn} onPress={() => toggleExpand(order.id)}>
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
    gap: 20,
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
