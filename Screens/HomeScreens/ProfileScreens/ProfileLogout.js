import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from '../../AuthContext';
import Constants from 'expo-constants';

const { BASE_URL } = Constants.expoConfig.extra;
const API_URL_GETPROFILE = `${BASE_URL}/api/franchise/getProfile`;

const ProfileLogout = ({ navigation }) => {
  const { loginData, logout } = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState(require("../../../assets/Profileboy.jpg"));
  const [loadingProfile, setLoadingProfile] = useState(false);

  // Fetch profile image
  useEffect(() => {
  const fetchProfile = async () => {
    // ✅ guard against null loginData
    if (!loginData || !loginData.data) return;

    setLoadingProfile(true);
    try {
      const res = await fetch(API_URL_GETPROFILE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: loginData.data.phone, name: loginData.data.name }),
      });

      if (!res.ok) throw new Error(`Status: ${res.status}`);
      const data = await res.json();
      if (data?.signedUrl) setProfileImage({ uri: data.signedUrl });
    } catch (err) {
      console.log("Error fetching profile:", err);
    } finally {
      setLoadingProfile(false);
    }
  };

  fetchProfile();
}, [loginData]);


 const [isLoggingOut, setIsLoggingOut] = useState(false);

const handleLogout = () => {
  Alert.alert(
    "Logout",
    "Are you sure you want to logout?",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          // Navigate immediately
          navigation.replace("Page1");

          // Delay clearing loginData and AsyncStorage by 2 seconds
          setTimeout(async () => {
            try {
              await logout(); // clear context and AsyncStorage
              console.log("Cache cleared after 2 seconds!");
            } catch (err) {
              console.log("Error clearing cache:", err);
            }
          }, 2000);
        },
      },
    ]
  );
};




  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="notifications-none" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Profile */}
     {loginData ? (
  <View style={{ width: '90%', alignSelf: 'center' }}>
    <View style={styles.profileRow}>
      {loadingProfile ? (
        <ActivityIndicator size="small" />
      ) : (
        <Image source={profileImage} style={styles.profileImg} />
      )}
      <View>
        <Text style={styles.welcomeText}>
          Hello {loginData?.data?.name || "User"},
        </Text>
        <Text style={styles.subText}>Welcome Back!!</Text>
      </View>
    </View>

    <Text style={styles.title}>Logout from device</Text>

    <View style={styles.logoutContainer}>
      <Text style={styles.label}>Logout from device?</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  </View>
) : (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>No user data available</Text>
  </View>
)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20, paddingTop: '5%' },
  headerRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 30 },
  iconBtn: { backgroundColor: "#fff", padding: 8, borderRadius: 12, elevation: 10 },
  profileRow: { flexDirection: "row", alignItems: "center", marginBottom: 20, gap: 10 },
  profileImg: { width: 55, height: 55, borderRadius: 55, marginRight: 10 },
  welcomeText: { fontSize: 12, color: "#333" },
  subText: { fontSize: 16, color: "#333", fontWeight: "600" },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 15, color: "#000" },
  logoutContainer: { marginTop: 10 },
  label: { fontSize: 14, color: "#222", marginBottom: 10 },
  logoutButton: { backgroundColor: "#000", paddingVertical: 12, borderRadius: 8, alignItems: "center" },
  logoutText: { color: "#fff", fontWeight: "600", fontSize: 15 },
});

export default ProfileLogout;
