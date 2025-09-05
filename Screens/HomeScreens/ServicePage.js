import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput , ScrollView} from "react-native";
import { MaterialIcons, Feather, Fontisto , FontAwesome} from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

const steps = [
    { id: 1, title: "Equipment Check" },
    { id: 2, title: "Reach Out" },
    { id: 3, title: "Payment" },
    { id: 4, title: "Confirmation" },
];

const ServicePage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [otp, setOtp] = useState(["", "", "", ""]);
    const inputs = useRef([]);
     const route = useRoute();
  const { loginData } = route.params;

    const handleOtpChange = (text, index) => {
        let newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text && index < 3) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    const renderCardContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <>
                        <View style={styles.cardIconCircle}>
                            <Feather name="tool" size={28} color="#888" />
                        </View>
                        <Text style={styles.cardOrderTitle}>Order Received</Text>
                        <Text style={styles.cardOrderDesc}>
                            Check if any equipment is required
                        </Text>
                        <View style={styles.cardActionsRow}>
                            <TouchableOpacity
                                style={styles.cardBtnYes}
                                onPress={() => setCurrentStep(2)}
                            >
                                <MaterialIcons
                                    name="check-circle-outline"
                                    style={{ fontSize: 20, color: "white" }}
                                />
                                <Text style={styles.cardBtnText}> Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.cardBtnNo}
                                onPress={() => setCurrentStep(2)}
                            >
                                <Fontisto
                                    name="close"
                                    style={{ fontSize: 20, color: "white" }}
                                />
                                <Text style={styles.cardBtnText}> No</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                );
            case 2:
                return (
                    <>
                        <Text style={styles.cardOrderTitle}></Text>
                        <View style={styles.map}></View>
                        <View style={styles.cardBox} />
                        <TouchableOpacity
                            style={styles.nextBtn}
                            onPress={() => setCurrentStep(3)}
                        >
                            <Text style={styles.cardBtnText}>Continue</Text>
                        </TouchableOpacity>
                    </>
                );
            case 3:
                return (
                    <>
                        <View style={styles.cardIconCircle}>
                            <MaterialIcons name="qr-code" size={28} color="#888" />
                        </View>
                        <Text style={styles.cardOrderTitle}>Make Payment</Text>
                        <View style={styles.paymentqr}></View>
                        <Text style={styles.cardOrderDesc1}>Enter OTP</Text>
                        <View style={styles.otpRow}>
                            {otp.map((digit, index) => (
                                <TextInput
                                    key={index}
                                    style={styles.otpBox}
                                    value={digit}
                                    onChangeText={(text) => handleOtpChange(text, index)}
                                    onKeyPress={(e) => handleKeyPress(e, index)}
                                    keyboardType="number-pad"
                                    maxLength={1}
                                    textAlign="center"
                                    ref={(ref) => (inputs.current[index] = ref)}
                                />
                            ))}
                        </View>
                        <TouchableOpacity
                            style={styles.nextBtn}
                            onPress={() => {
                                console.log("OTP Entered:", otp.join(""));
                                setCurrentStep(4);
                            }}
                        >
                            <Text style={styles.cardBtnText}>Verify</Text>
                        </TouchableOpacity>
                    </>
                );
            case 4:
                return (
                    <>
                        {/* <Text style={styles.cardOrderTitle}>Confirmation</Text> */}
                        <Text style={styles.cardTimer}>01:30:59</Text>
                        <View style={styles.uploadBox}>
                            <FontAwesome name="cloud-upload" size={24} color="#555" />
                            <Text style={styles.uploadText}>Drag and drop here</Text>
                            <Text>or</Text>
                            <Text style={styles.uploadLink}>Browse files</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.nextBtn}
                            onPress={() => setCurrentStep(1)}
                        >
                            <Text style={styles.cardBtnText}>Done</Text>
                        </TouchableOpacity>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <ScrollView>
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerRow}>
                <Text style={styles.headerText}>
                    {loginData.data.name || "User"}'s <Text style={styles.headerBold}>Playground</Text>
                </Text>
                <MaterialIcons
                    name="notifications-none"
                    size={24}
                    color="#222"
                    style={styles.bellIcon}
                />
            </View>

            {/* Progress Bar */}
            <Text style={styles.progressTitle}>Service Progress</Text>
            <View style={styles.progressBar}>
                {steps.map((step, index) => (
                    <View key={step.id} style={styles.progressStep}>
                        <View
                            style={
                                step.id <= currentStep
                                    ? styles.progressCircleActive
                                    : styles.progressCircle
                            }
                        >
                            {step.id <= currentStep && (
                                <Feather name="check-circle" size={24} color="#15D30F" />
                            )}
                        </View>
                        {index < steps.length - 1 && (
                            <View
                                style={
                                    step.id < currentStep
                                        ? styles.progressLine
                                        : styles.progressLine
                                }
                            />
                        )}
                    </View>
                ))}
            </View>

            {/* Labels */}
            <View style={styles.progressLabelsRow}>
                {steps.map((step) => (
                    <Text
                        key={step.id}
                        style={
                            step.id === currentStep
                                ? styles.progressLabelActive
                                : styles.progressLabelActive
                        }
                    >
                        {step.id <= currentStep ? step.title : ""}
                    </Text>
                ))}
            </View>

            {/* Card */}
            <Text style={styles.cardTitle}>{steps[currentStep - 1].title}</Text>
            <View style={styles.card}>
                <View style={styles.cardLocationRow}>
                    <MaterialIcons name="location-on" size={18} color="#222" />
                    <Text style={styles.cardLocation}>Lala Cheruvu, Rjy</Text>
                </View>
                {renderCardContent()}
            </View>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        paddingTop: "10%",
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 18,
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        paddingBottom: 10,
        width: "90%",
        marginBottom: 20,
    },
    headerText: {
        fontSize: 20,
        color: "#222",
    },
    headerBold: {
        fontWeight: "bold",
        fontSize: 22,
    },
    bellIcon: {
        marginLeft: 8,
    },
    progressTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 8,
        marginBottom: 8,
        alignSelf: "flex-start",
        paddingLeft: 18,
    },
    progressBar: {
        flexDirection: "row",
        alignItems: "center",
        width: "88%",
        justifyContent: "center",
    },
    progressStep: {
        flexDirection: "row",
        alignItems: "center",
    },
    paymentqr: {
        width: 200,
        height: 200,
        backgroundColor: "#D9D9D9",
        marginBottom: 20,
    },
    progressCircleActive: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    progressCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 2,
        borderColor: "#222",
        backgroundColor: "#fff",
    },
    progressLine: {
        width: 40,
        height: 4,
        backgroundColor: "#222",
    },
    progressLabelsRow: {
        flexDirection: "row",
        width: "88%",
        justifyContent: "space-between",
        marginVertical: 12,
        marginBottom: 40,
    },
    progressLabelActive: {
        fontSize: 9,
        fontWeight: "bold",
        color: "#222",
        width: 80,
        textAlign: "center",
    },
    map: {
        width: 250,
        backgroundColor: "#D9D9D9",
        height: 200,
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 18,
        padding: 18,
        width: "80%",
        alignItems: "center",
        elevation: 2,
        shadowOpacity: 0.07,
    },
    cardLocationRow: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
    },
    cardLocation: {
        fontSize: 15,
        fontWeight: "500",
        marginLeft: 4,
    },
    cardIconCircle: {
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: "#f3f3f3",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 18,
        marginBottom: 5,
    },
    cardOrderTitle: {
        fontSize: 17,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 4,
    },
    cardOrderDesc: {
        fontSize: 13,
        color: "#888",
        marginBottom: 12,
        textAlign: "center",
    },
    cardOrderDesc1: {
        fontSize: 13,
        color: "#888",
        marginBottom: 1,
        textAlign: "left",
        width: "100%",
    },
    cardActionsRow: {
        flexDirection: "row",
        justifyContent: "center",
    },
    cardBtnYes: {
        backgroundColor: "#22c55e",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 32,
        marginRight: 10,
        flexDirection: "row",
        alignItems: "center",
        color: "#fff",
    },
    cardBtnNo: {
        backgroundColor: "#f44336",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 32,
        flexDirection: "row",
        alignItems: "center",
        color: "#fff",
    },
    cardBtnText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    nextBtn: {
        backgroundColor: "#22c55e",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 40,
        marginTop: 12,
    },
    otpRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 5,
    },
    otpBox: {
        borderWidth: 1,
        borderColor: "#ccc",
        width: 40,
        height: 50,
        borderRadius: 8,
        fontSize: 18,
        marginHorizontal: 6,
        textAlign: "center",
        color: "#222",
    },
    uploadBox: {
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: "#999",
        borderRadius: 6,
        paddingVertical: 30,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        width: "90%",
        height: 120,
    },
    uploadText: {
        color: "#555",
        fontSize: 14,
        marginBottom: 4,
    },
    uploadLink: {
        color: "#007BFF",
        fontSize: 14,
        textDecorationLine: "underline",
    },
    cardTimer: {
        fontSize: 22,
        fontWeight: "bold",
        backgroundColor: "#d9d9d9",
        paddingHorizontal: 20,
        paddingVertical: 6,
        marginVertical: 16,
    },
});

export default ServicePage;
