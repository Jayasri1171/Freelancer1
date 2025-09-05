import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Avatar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from '@react-navigation/native';

const ProfileLevel = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { loginData } = route.params;
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
        <View style={{ width: '90%', alignSelf: 'center' }}>
      <View style={styles.profileRow}>
        <Avatar.Image
          size={55}
          source={require("../../../assets/Profileboy.jpg")}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.greeting}>Hello {loginData.data.name},</Text>
          <Text style={styles.subGreeting}>Welcome Back!!</Text>
        </View> 
        <Image source={require("../../../assets/Badges/bronze.png")} style={{ width: 60, height: 60, marginLeft: 'auto' }}/>
      </View>

      {/* Title */}
      <Text style={styles.sectionTitle}>Level Up</Text>

      {/* Levels */}
      <View style={styles.levelContainer}>
        {/* Left side (line + dots) */}
        <View style={styles.lineColumn}>
          <View style={[styles.greenDot, styles.activeDot]} />
          <View style={styles.verticalLine} />
          <View style={styles.greenDot} />
          <View style={styles.verticalLine} />
          <View style={styles.greenDot} />
        </View>

        {/* Right side (badges + text) */}
        <View style={styles.badgeColumn}>
          {/* Bronze */}
          <View style={styles.badgeRow}>
            <Text style={[styles.badgeTitle, styles.activeText]}>Bronze</Text>
              <Text style={styles.badgeText}>
                You should complete X services to get silver membership
              </Text>
          </View>

          {/* Silver */}
          <View style={styles.badgeRow}>
            <Image
              source={require("../../../assets/Badges/silver.png")}
              style={styles.badgeIcon}
            />
          </View>

          {/* Gold */}
          <View style={styles.badgeRow}>
            <Image
              source={require("../../../assets/Badges/gold.png")}
              style={styles.badgeIcon}
            />
          </View>
        </View>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff", 
    padding: 20 ,
    paddingTop: '10%'
},
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  iconBtn: {
    backgroundColor: "#f6f6f6",
    padding: 8,
    borderRadius: 12,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  profileRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  greeting: { fontSize: 14, color: "#444" },
  subGreeting: { fontSize: 14, fontWeight: "600", color: "#000" },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginVertical: 10 },

  levelContainer: { flexDirection: "row", marginTop: 15 , gap: 0},
  lineColumn: { alignItems: "center" },
  verticalLine: {
    width: 4,
    height: 85,
    backgroundColor: "black",
  },
  greenDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "green",
  },
  activeDot: {
    borderWidth: 3,
    borderColor: "#2ecc71",
    backgroundColor: "#fff",
  },
  badgeColumn: { flex: 1 },
  badgeRow: {  marginLeft:20,alignItems: "left", marginBottom: 25 , },
  badgeIcon: { width: 60, height: 60, marginRight: 10 },
  badgeTitle: { fontSize: 15, fontWeight: "600", color: "#333" },
  badgeText: { fontSize: 12, color: "#666", marginTop: 2 },
  activeText: { color: "green" },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#000",
    borderRadius: 25,
    padding: 14,
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  navBtn: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 20,
  },
  activeNav: {
    backgroundColor: "#2ecc71",
  },
});

export default ProfileLevel;
