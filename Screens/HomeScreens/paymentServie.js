import RazorpayCheckout from "react-native-razorpay";

const API_BASE_URL = "https://cube-backend-service.onrender.com"; // replace with your backend

export class PaymentService {
    static async createOrder(paymentData) {
        // console.log("Creating order with data:", paymentData);
        const res = await fetch(`${API_BASE_URL}/api/razorpay/createOrder`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(paymentData),
        });
        return await res.json();
    }

    static async verifyPayment(paymentData) {
        const res = await fetch(`${API_BASE_URL}/api/razorpay/verifyOrder`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(paymentData),
        });
        return await res.json();
    }

    static async processPayment(paymentData) {
        try {
            // Step 1: Create order
            const orderResponse = await this.createOrder(paymentData);
            if (!orderResponse.success) throw new Error("Order creation failed");

            const options = {
                key: orderResponse.keyId,
                amount: orderResponse.amount,
                currency: "INR",
                order_id: orderResponse.orderId,
                name: "MyApp",
                description: "Payment for MyApp",
                prefill: {
                    email: paymentData.email || "",
                    contact: paymentData.userID || "",
                    name: paymentData.name || "",
                },
                theme: { color: "#3399cc" },
            };


            // Step 2: Open Razorpay checkout
            const paymentResult = await RazorpayCheckout.open(options);

            // Step 3: Verify payment
            const verifyResponse = await this.verifyPayment(paymentResult);
            if (!verifyResponse.success) throw new Error("Payment verification failed");

            return { success: true, paymentId: paymentResult.razorpay_payment_id };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}
