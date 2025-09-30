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
  const login = async (phoneNumber) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000); // 20s timeout

    try {
      const expoPushToken = await getPushToken(); // get Expo token

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ phone: phoneNumber, fcmToken: expoPushToken }), // send token to backend
        signal: controller.signal,
      });

      clearTimeout(timeout);

      let data = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok) {
        const message = data?.message || data?.error || `Request failed with status ${res.status}`;
        throw new Error(message);
      }

      // ✅ Save login data + phone
      setLoginData(data);
      await AsyncStorage.setItem("loginData", JSON.stringify(data));
      await AsyncStorage.setItem("userPhone", phoneNumber);

      return data;
    } catch (err) {
      if (err.name === "AbortError") throw new Error("Request timed out. Check your connection.");
      throw err;
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
    <AuthContext.Provider value={{ loginData, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook
export const useAuth = () => useContext(AuthContext);
