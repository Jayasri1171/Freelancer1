import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { PaymentService } from "./paymentServie";

export default function PaymentScreen() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    const paymentData = {
      amount: 500, 
      userID:"9177463467"// ₹500
    //   currency: "INR",
    //   email: "test@example.com",
    //   phone: "9876543210",
    //   customerName: "Test User",
    //   description: "Premium subscription",
    };

    const result = await PaymentService.processPayment(paymentData);

    if (result.success) {
      Alert.alert("Payment Successful", `Payment ID: ${result.paymentId}`);
    } else {
      Alert.alert("Payment Failed", result.error);
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Premium Subscription</Text>
      <TouchableOpacity
        style={[styles.payButton, loading && styles.disabledButton]}
        onPress={handlePayment}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.payButtonText}>Pay ₹500</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  payButton: { backgroundColor: "#3399cc", padding: 15, borderRadius: 8 },
  disabledButton: { backgroundColor: "#999" },
  payButtonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});
