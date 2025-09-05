import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRoute } from '@react-navigation/native';

const ProfileLogout = ({ navigation }) => {
  const route = useRoute();
  const { loginData } = route.params;
  const handleLogout = () => {
    // Add your logout logic here (e.g., clearing tokens, navigating to login)
    console.log("Logged out!");
    navigation.replace("Page1"); // Example: Navigate to Login Page
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <MaterialIcons name="notifications-none" size={24} color="#000" />
      </View>

      {/* Profile */}
      <View style={{ width: '90%', alignSelf: 'center' }}>
        <View style={styles.profileRow}>
          <Image
            source={require("../../../assets/Profileboy.jpg")}
            size={55}
            style={styles.profileImg}
          />
          <View>
            <Text style={styles.welcomeText}>Hello {loginData.data.name},</Text>
            <Text style={styles.subText}>Welcome Back!!</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Logout from device</Text>

        {/* Logout Section */}
        <View style={styles.logoutContainer}>
          <Text style={styles.label}>Logout from device ?</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  backButton: {
    backgroundColor: "#f5f5f5",
    padding: 8,
    borderRadius: 10,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  profileImg: {
    width: 55,
    height: 55,
    borderRadius:55,
    marginRight: 10,
  },
  welcomeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  subText: {
    fontSize: 12,
    color: "#555",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#000",
  },
  logoutContainer: {
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    color: "#222",
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  bottomTab: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f5f5f5",
    paddingVertical: 12,
    borderRadius: 30,
    position: "absolute",
    bottom: 15,
    left: 20,
    right: 20,
  },
});



export default ProfileLogout;