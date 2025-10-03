// Screens/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

const { BASE_URL } = Constants.expoConfig.extra;
const API_URL = `${BASE_URL}/api/franchise/login`;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loginData, setLoginData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load cached loginData on app start
  useEffect(() => {
    const loadCache = async () => {
      try {
        const cached = await AsyncStorage.getItem("loginData");
        if (cached) setLoginData(JSON.parse(cached));
      } catch (err) {
        console.log("Failed to load cache:", err);
      } finally {
        setLoading(false);
      }
    };
    loadCache();
  }, []);

  // ✅ Get Expo push token
  const getPushToken = async () => {
    let expoPushToken = await AsyncStorage.getItem("expoPushToken");
    if (!expoPushToken) {
      try {
        if (Device.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;

          if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }

          if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification!");
            return null;
          }

          const token = (await Notifications.getExpoPushTokenAsync()).data;
          expoPushToken = token;

          if (expoPushToken) {
            await AsyncStorage.setItem("expoPushToken", expoPushToken);
            console.log("Expo Push Token:", expoPushToken);
          }
        } else {
          alert("Must use physical device for Push Notifications");
        }
      } catch (error) {
        console.log("Error fetching push token:", error);
      }
    }
    return expoPushToken;
  };

  // ✅ Login function
  // ✅ Request OTP (only send phone + token, don't save yet)
const requestOtp = async (phoneNumber) => {
  try {
    const expoPushToken = await getPushToken();

    const res = await fetch(`${BASE_URL}/api/franchise/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: phoneNumber, fcmToken: expoPushToken }),
    });

    const data = await res.json();
    console.log(data);
    if (!res.ok) throw new Error(data?.message || "Failed to request OTP");

    // ⚠️ Do NOT save to cache here

    // setLoginData(data);
     return {
     data
    };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

// ✅ Verify OTP (save loginData only if correct)
const verifyOtp = async (phoneNumber, otp) => {
  try {
    const res = await fetch(`${BASE_URL}/api/franchise/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: phoneNumber, otp }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "OTP verification failed");

    // ✅ Now only save after correct OTP
    setLoginData(data);
    await AsyncStorage.setItem("loginData", JSON.stringify(data));
    await AsyncStorage.setItem("userPhone", phoneNumber);

    return { success: true, data };
  } catch (err) {
    return { success: false, message: err.message };
  }
};


  // ✅ Logout
  const logout = async () => {
    try {
      setLoginData(null);
      await AsyncStorage.multiRemove(["loginData", "userPhone", "expoPushToken"]);
    } catch (err) {
      console.log("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ loginData, requestOtp, logout, loading , verifyOtp , setLoginData}}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook
export const useAuth = () => useContext(AuthContext);
