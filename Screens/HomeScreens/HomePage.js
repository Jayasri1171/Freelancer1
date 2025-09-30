import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { LineChart } from "react-native-chart-kit";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";


const { width, height } = Dimensions.get("window"); // Get device dimensions

const HomePage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { loginData } = useContext(AuthContext);
  // console.log("Login Data in HomePage:", loginData);

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 0 }}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>
            Welcome,{" "}
            <Text style={styles.headerBold}>
              {loginData.data.name || "User"}!
            </Text>
          </Text>
          <MaterialIcons
            name="notifications-none"
            size={24}
            color="#222"
            onPress={() => navigation.navigate("Notifications")}
          />
        </View>

        {/* Lifetime Earnings */}
        <View style={styles.lifetimeRow}>
          <Text style={styles.lifetimeAmount}>₹ 35,235.89</Text>
          <Text style={styles.lifetimeLabel}>Lifetime</Text>
        </View>

        {/* Chart */}
        <View style={styles.chartBox}>
          <LineChart
            data={{
              labels: ["0D", "5D", "10D", "15D", "20D", "25D", "30D"], // X-axis
              datasets: [
                {
                  data: [15, 14, 15, 13, 16, 15, 13, 17, 12, 15, 15, 17, 14, 18, 13, 19, 18, 15, 17, 16, 20, 30], // Y-axis values
                  color: (opacity = 1) => `rgba(255, 255, 0, ${opacity})`,
                  strokeWidth: 2,
                  color: () => `#ffff00`,
                },
              ],
            }}
            width={width * 0.9}
            height={height * 0.25}
            fromZero={true}
            segments={4}
            withDots={false}            // no round dots
            withInnerLines={false}      // remove grid lines inside
            withOuterLines={true}       // keep axis lines
            withVerticalLabels={true}   // show X-axis labels
            withHorizontalLabels={true} // show Y-axis labels
            chartConfig={{
              backgroundColor: "#222",
              backgroundGradientFrom: "#222",
              backgroundGradientTo: "#222",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 0, ${opacity})`,
              labelColor: () => "#fff",
              propsForBackgroundLines: {
                stroke: "#444", // subtle grid/axis line color
              },
              fillShadowGradientFrom: "#ffff00",
              fillShadowGradientTo: "#000",
              fillShadowGradientFromOpacity: 0.4,
              fillShadowGradientToOpacity: 1,
            }}
            style={{
              borderRadius: 18,
            }}
          />
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.targetBox}>
            <Text style={styles.serviceboxheader}>Service Target</Text>

            <AnimatedCircularProgress
              size={100} // circle size
              width={8} // stroke width
              fill={60}  // percentage (dynamic: use (score/target)*100)
              tintColor="#F2FF00"
              backgroundColor="#444"
              rotation={0} // start from top
              lineCap="round"
              style={{ marginVertical: 10 }}
            >
              {(fill) => (
                <Text style={styles.targetPercent}>{`${Math.round(fill)}%`}</Text>
              )}
            </AnimatedCircularProgress>

            <View style={styles.targetDetails}>
              <View style={styles.targetDetailBox}>
                <Text style={styles.targetSub}>Target : 100</Text>
                <Text style={styles.targetDesc}>
                  You have to complete 40 services to reach the target
                </Text>
              </View>
              <View style={styles.targetDetailBox}>
                <Text style={styles.targetSub}>Score : 60</Text>
                <Text style={styles.targetDesc}>
                  You have to complete 40 services to reach the target
                </Text>
              </View>
            </View>
          </View>


          <View style={styles.statsCol}>
            <View style={styles.statsCard}>
              <Text style={styles.statsTitle}>Total Due</Text>
              <Text style={styles.statsAmount}>₹ {loginData.data.due}.00</Text>
              <View style={styles.statsDivider}>
                <View style={styles.statsChangeRow}>
                  <Text style={styles.statsChange}> +67%</Text>
                  <Text style={styles.statsChangeDesc}>Than last month</Text>
                </View>
              </View>
            </View>

            <View style={styles.statsCard}>
              <View style={styles.statsDivider}>
                <View style={styles.statsChangeRow}>
                  <View>
                    <Text style={styles.statsTitle}>Total Delivery</Text>
                    <Text style={styles.statsAmount}>
                      102 <Text style={styles.statsChangeDesc}>Till today</Text>
                    </Text>
                    <View style={styles.statsChangeRow}>
                      <Text style={styles.statsChange}> +67%</Text>
                      <Text style={styles.statsChangeDesc}>
                        Than last month
                      </Text>
                    </View>
                  </View>
                  {/* <View style={styles.statsLastMonth}>
                    <Text style={styles.statsSub}>Last Month</Text>
                    <Text style={styles.statsLastMonthAmount}>186</Text>
                  </View> */}
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Reviews */}
        {/* <Text style={styles.reviewsTitle}>Reviews</Text>
        <View style={styles.reviewsBox}>
          {reviews.map((r, idx) => (
            <View key={idx} style={styles.reviewItem}>
              <Image source={r.avatar} style={styles.reviewAvatar} />
              <View style={styles.reviewInfo}>
                <Text style={styles.reviewName}>{r.name}</Text>
                <Text style={styles.reviewCustId}>CustID : {r.custId}</Text>
              </View>
              <View style={styles.reviewService}>
                <Text style={styles.reviewServiceText}>{r.service}</Text>
                <Text style={styles.reviewDate}>{r.date}</Text>
              </View>
            </View>
          ))}
        </View> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    paddingTop: height * 0.04,
    alignItems: "center",
    paddingHorizontal: 7,
    // minHeight: height-100,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  headerText: {
    fontSize: width * 0.05,
    color: "#222",
  },
  headerBold: {
    fontWeight: "bold",
    fontSize: width * 0.06,
    color: "#222",
  },
  lifetimeRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: height * 0.01,
    marginTop: height * 0.01,
    width: "90%",
  },
  lifetimeAmount: {
    fontSize: width * 0.07,
    fontWeight: "bold",
    color: "#222",
    marginRight: 8,
  },
  lifetimeLabel: {
    fontSize: width * 0.035,
    color: "#888",
    marginBottom: 4,
  },
  targetPercent: {
    fontSize: width * 0.045,
    fontWeight: "bold",
    color: "#fff",
  },
  chartBox: {
    backgroundColor: "#222",
    borderRadius: 18,
    width: "90%",
    height: height * 0.25,
    marginBottom: height * 0.015,
    justifyContent: "center",
    alignItems: "center",
  },
  chartPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  chartText: {
    color: "#fff",
    fontSize: width * 0.045,
  },
  statsRow: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginBottom: height * 0.015,
  },
  targetBox: {
    backgroundColor: "black",
    borderRadius: 18,
    padding: 12,
    width: "48%",
    alignItems: "center",
  },
  circleOuter: {
    width: width * 0.17,
    height: width * 0.17,
    borderRadius: (width * 0.17) / 2,
    backgroundColor: "#F2FF00",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  circleInner: {
    width: width * 0.16,
    height: width * 0.16,
    borderRadius: (width * 0.16) / 2,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  targetPercent: {
    fontSize: width * 0.045,
    fontWeight: "bold",
    color: "#fff",
  },
  serviceboxheader: {
    color: "#fff",
    fontSize: width * 0.042,
    width: "100%",
    textAlign: "left",
    fontWeight: "600",
  },
  targetDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  targetDetailBox: {
    width: "48%",
  },
  targetSub: {
    color: "#fff",
    fontSize: width * 0.03,
    marginBottom: 2,
    fontWeight:500,

  },
  targetDesc: {
    color: "#fff",
    fontSize: width * 0.02,
    marginTop: 2,
    fontWeight:500,
  },
  statsCol: {
    width: "48%",
    justifyContent: "space-between",
  },
  statsCard: {
    backgroundColor: "#111",
    borderRadius: 14,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    // paddingRight:50
  },
  statsTitle: {
    color: "#fff",
    fontSize: width * 0.035,
    fontWeight: "bold",
    marginBottom: 2,
  },
  statsAmount: {
    color: "#fff",
    fontSize: width * 0.05,
    fontWeight: "bold",
    marginBottom: 2,
  },
  statsSub: {
    color: "#fff",
    fontSize: width * 0.03,
    fontWeight: "400",
  },
  statsChange: {
    color: "#22c55e",
    fontSize: width * 0.03,
    marginBottom: 2,
  },
  statsChangeDesc: {
    color: "white",
    fontSize: width * 0.02,
  },
  statsDivider: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    paddingBottom: 4,
  },
  statsChangeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statsLastMonth: {
    alignItems: "center",
    justifyContent: "center",
  },
  statsLastMonthAmount: {
    color: "white",
    fontSize: width * 0.05,
  },
  reviewsTitle: {
    fontSize: width * 0.075,
    fontWeight: "bold",
    color: "#222",
    alignSelf: "flex-start",
    marginLeft: "5%",
    marginTop: height * 0.01,
  },
  reviewsBox: {
    width: "90%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 8,
    // gap:5,
  },
  reviewItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D7D7D7",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 8,
  },
  reviewAvatar: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: (width * 0.1) / 2,
    marginRight: 10,
    backgroundColor: "#ccc",
  },
  reviewInfo: {
    flex: 1,
    justifyContent: "center",
  },
  reviewName: {
    fontSize: width * 0.035,
    fontWeight: "bold",
    color: "#222",
  },
  reviewCustId: {
    fontSize: width * 0.03,
  },
  reviewService: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  reviewServiceText: {
    fontSize: width * 0.035,
    color: "#222",
    fontWeight: "bold",
  },
  reviewDate: {
    fontSize: width * 0.03,
  },
});

export default HomePage;
