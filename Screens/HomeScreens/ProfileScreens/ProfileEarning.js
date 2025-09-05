import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { MaterialIcons, Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";


const jobs = [
    { id: "1", title: "Plumbing Issue", name: "Kungfu Kumari", price: "₹2,500.00", time: "0.5 hr", image: require("../../../assets/Profileboy.jpg") },
    { id: "2", title: "Plumbing Issue", name: "Thanos", price: "₹2,000.00", time: "0.5 hr", image: require("../../../assets/Profileboy.jpg"), highlight: true },
    { id: "3", title: "Plumbing Issue", name: "Brock Lesnar", price: "₹1,800.00", time: "0.5 hr", image: require("../../../assets/Profileboy.jpg") },
    { id: "4", title: "Plumbing Issue", name: "Dean Ambrose", price: "₹1,500.00", time: "0.5 hr", image: require("../../../assets/Profileboy.jpg") },
    { id: "5", title: "Plumbing Issue", name: "Reynold Ray", price: "₹1,200.00", time: "0.5 hr", image: require("../../../assets/Profileboy.jpg") },
    { id: "6", title: "Plumbing Issue", name: "Reynold Ray", price: "₹1,200.00", time: "0.5 hr", image: require("../../../assets/Profileboy.jpg") },
    { id: "7", title: "Plumbing Issue", name: "Reynold Ray", price: "₹1,200.00", time: "0.5 hr", image: require("../../../assets/Profileboy.jpg") },
    { id: "8", title: "Plumbing Issue", name: "Reynold Ray", price: "₹1,200.00", time: "0.5 hr", image: require("../../../assets/Profileboy.jpg") },

];

const ProfileEarning = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { loginData } = route.params;
    const renderItem = ({ item }) => (
        <View style={[styles.card, item.highlight && styles.highlightCard]}>
            <Image source={item.image} style={styles.avatar} />
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.name}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.price}>{item.price}</Text>
                <View style={styles.timeRow}>
                    <Feather name="clock" size={14} color="#777" />
                    <Text style={styles.time}>{item.time}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Top Nav */}
            <View style={styles.topNav}>
                <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back-ios" size={20} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="notifications-outline" size={22} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Header */}
            <View style={styles.headerRow}>
                <View style={styles.row}>
                    <Image source={require("../../../assets/Profileboy.jpg")} style={styles.profileImg} />
                    <View>
                        <Text style={styles.welcomeText}>Hello {loginData.data.name},</Text>
                        <Text style={styles.subText}>Welcome Back!!</Text>
                    </View>
                </View>
                <View style={styles.coinBox}>
                    <Image source={require("../../../assets/Badges/goldcoin.jpg")} style={styles.coinIcon} />
                    <Text style={styles.coinText}>120</Text>
                </View>
            </View>

            {/* Earnings Box */}
            <View style={{ alignItems: "center" }}>
                <Text style={{ textAlign: "left", width: "90%", fontSize: 15, marginBottom: 10, fontWeight: 700 }}>Earnings</Text>
                <LinearGradient
                    colors={["#2ecc71", "#a8e6a3"]}  // adjust colors for same gradient as screenshot
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.earningsBox}
                >
                    <Feather name="chevron-left" size={22} />
                    <View>
                        <Text style={styles.earningsLabel}>This Month</Text>
                        <Text style={styles.earningsAmount}>₹ 10,584.24</Text>
                    </View>
                    <Feather name="chevron-right" size={22} />
                </LinearGradient>
            </View>

            {/* List */}
            <View style={{ flex: 1, width: "100%", paddingHorizontal: 16 }}>
                <Text style={styles.sectionTitle}>See List</Text>
                <FlatList
                    data={jobs}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingBottom: 50 }}
                    showsVerticalScrollIndicator={false}   // 🚀 hides vertical scrollbar
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        paddingTop: '10%',
        // alignItems: "center",
        // justifyContent: "center",
    },
    topNav: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 30,

    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    row: { flexDirection: "row", alignItems: "center" },
    profileImg: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
    welcomeText: { fontSize: 14, fontWeight: "400" },
    subText: { fontSize: 18, fontWeight: "600" },
    coinBox: {
        flexDirection: "row",
        backgroundColor: "#f5f5f5",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        alignItems: "center",
    },
    coinIcon: { width: 16, height: 16, marginRight: 6 },
    coinText: { fontWeight: "bold", fontSize: 14 },
    earningsBox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%",
        height: 130,
        backgroundColor: "#2ecc71",
        borderRadius: 12,
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#27ae60",
        elevation: 3,
    },
    earningsLabel: { textAlign: "center", fontSize: 14 },
    earningsAmount: { fontSize: 22, fontWeight: "bold", textAlign: "center" },
    sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 10 },
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 12,
        marginBottom: 10,
        elevation: 2,
        borderWidth: 1,
        borderColor: "#eee",
    },
    iconBtn: {
        backgroundColor: "#f6f6f6",
        padding: 8,
        borderRadius: 12,
        elevation: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    //   highlightCard: { borderColor: "#2eccff", borderWidth: 2 }, // Blue border highlight
    avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
    title: { fontSize: 14, fontWeight: "600" },
    subtitle: { fontSize: 12, color: "#555" },
    price: { fontSize: 14, fontWeight: "bold", color: "green" },
    timeRow: { flexDirection: "row", alignItems: "center", marginTop: 2 },
    time: { fontSize: 12, color: "#777", marginLeft: 4 },
});

export default ProfileEarning;
