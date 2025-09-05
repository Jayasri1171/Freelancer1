import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Animated,
    ScrollView,
    Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
const { width } = Dimensions.get("window");
const plans = [
    {
        id: "bronze",
        name: "Bronze Plan",
        price: "150",
        colors: ["#f5e0c5", "#cd7f32"],
        badge: require("../assets/Badges/bronze.png"),
        benefits: [
            "Start your journey with basic access to job requests.",
            "Designed for new workers to prove thier reliability.",
            "Complete orders to unlock higher-level plans.",
        ],
    },
    {
        id: "silver",
        name: "Silver Plan",
        price: "200",
        colors: ["#f8f8f8", "#AFAFAF"],
        badge: require("../assets/Badges/silver.png"),
        benefits: [
            "Unlocks after successful completion of a few orders.",
            "Get more frequent and better-quality job requests.",
            "Priority support and increased visibility to customers.",
        ],
    },
    {
        id: "gold",
        name: "Gold Plan",
        price: "250",
        colors: ["#fff6b7", "#ffd700"],
        badge: require("../assets/Badges/gold.png"),
        benefits: [
            "Highest priority for job assignments and premium clients.",
            "Build trust with a “Top Worker” badge shown to customers.",
            "Maximum earnings potential and early access to top gigs.",
        ],
    },
];

function ChoosePlan() {
    const [selectedPlan, setSelectedPlan] = useState("bronze");
    const [data, setData] = useState(plans[0]);

    useEffect(() => {
        const selected = plans.find((item) => item.id === selectedPlan);
        setData(selected);
    }, [selectedPlan]);

    // Keep animated values for each plan
    const animatedScales = useRef(
        plans.reduce((acc, plan) => {
            acc[plan.id] = new Animated.Value(plan.id === selectedPlan ? 1.05 : 1);
            return acc;
        }, {})
    ).current;

    const handleSelectPlan = (planId) => {
        setSelectedPlan(planId);

        plans.forEach((plan) => {
            Animated.spring(animatedScales[plan.id], {
                toValue: plan.id === planId ? 1.05 : 1,
                useNativeDriver: true,
            }).start();
        });
    };

    return (
        <View style={styles.body}>
            <View style={styles.subbody}>
                <Text style={styles.heading}>Choose Your Plan</Text>
                <Text style={styles.subheading}>
                    Subscribe to get verified nearby job requests
                </Text>

                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {plans.map((plan) => (
                        <View key={plan.id} style={{ marginBottom: 25 }}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => handleSelectPlan(plan.id)}
                                style={styles.planButton}
                            >
                                <Animated.View
                                    style={{
                                        transform: [{ scale: animatedScales[plan.id] }],
                                    }}
                                >
                                    <View style={styles.cardContainer}>
                                        <Image source={plan.badge} style={styles.badge} />
                                        <LinearGradient
                                            colors={plan.colors}
                                            end={{ x: 1, y: 0 }}
                                            style={[
                                                styles.card,
                                                selectedPlan === plan.id && styles.selectedCard,
                                            ]}
                                        >
                                            <View style={styles.row}>
                                                <Text style={styles.title}>{plan.name}</Text>
                                                <Text style={styles.price}>Rs.{plan.price}</Text>
                                            </View>
                                        </LinearGradient>
                                    </View>
                                </Animated.View>
                            </TouchableOpacity>
                        </View>
                    ))}

                    {/* Benefits Section */}
                    {data && (
                        <View style={styles.benefitsContainer}>
                            <Text style={styles.benefitsTitle}>Why {data.name}</Text>
                            {data.benefits.map((benefit, index) => (
                                <Text key={index} style={styles.benefitItem}>
                                    • {benefit}
                                </Text>
                            ))}
                        </View>
                    )}

                    {/* Subscribe Button */}
                    <TouchableOpacity style={styles.subscribeButton}>
                        <Text style={styles.subscribeText}>Continue</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: "#D9CED4",
    },
    subbody: {
        flex: 1,
        backgroundColor: "#fff",
        marginTop: 30,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        padding: 20,
        paddingBottom: 40,
        marginHorizontal: 10
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000",
        marginTop: 20,
        textAlign: "center",
        marginBottom: 5,
    },
    subheading: {
        fontSize: 14,
        color: "#979595",
        textAlign: "center",
        marginBottom: 20,
    },
    scrollContainer: {
        paddingVertical: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    planButton: {
        width: width * 0.80,
    },
    cardContainer: {
        width: "100%",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
    },
    badge: {
        width: 80,
        height: 80,
        resizeMode: "contain",
        position: "absolute",
        left: -15,
        top: 1,
        zIndex: 20,
    },
    card: {
        height: 55,
        borderRadius: 15,
        paddingHorizontal: 12,
        justifyContent: "center",
        width: "88%",
        paddingLeft: 20,
    },
    selectedCard: {
        borderWidth: 1.5,
        borderColor: "#3a3a3a",
        borderRadius: 14,
        paddingHorizontal: 12,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
    },
    title: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#000",
    },
    price: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
    },
    benefitsContainer: {
        marginTop: 12,
        paddingHorizontal: 10,
    },
    benefitsTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 6,
        color: "#000",
    },
    benefitItem: {
        fontSize: 14,
        color: "#333",
        marginBottom: 4,
        fontWeight: "semi-bold",
    },
    subscribeButton: {
        backgroundColor: "#2859C5",
        paddingVertical: 12,
        borderRadius: 15,
        marginTop: 30,
        width: width * 0.8,
        alignItems: "center",
        alignSelf: "center",
    },
    subscribeText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default ChoosePlan;