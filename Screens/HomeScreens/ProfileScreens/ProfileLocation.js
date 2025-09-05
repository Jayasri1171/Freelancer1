import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Avatar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from '@react-navigation/native';



const ProfileLocation = () => {
   const route = useRoute();
  const { loginData } = route.params;
  const [locations, setLocations] = useState([
    { id: "1", name: "CRTI Area", active: true },
    { id: "2", name: "NarayanaPuram", active: true },
  ]);
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back Button + Notification */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="notifications-none" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Profile */}
      <View style={styles.profileRow}>
        <Avatar.Image
          size={45}
          source={require("../../../assets/Profileboy.jpg")}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.greeting}>Hello {loginData.data.name},</Text>
          <Text style={styles.subGreeting}>Welcome Back!!</Text>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.sectionTitle}>Locations</Text>

      {/* Dropdown Placeholder */}
      <TouchableOpacity style={styles.dropdown}>
        <Text style={styles.dropdownText}>Select two areas</Text>
        <MaterialIcons name="arrow-drop-down" size={22} color="#444" />
      </TouchableOpacity>

      {/* Location List */}
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.locationCard}>
            <Text style={styles.locationName}>{item.name}</Text>
            {item.active && (
              <MaterialIcons name="check-circle" size={18} color="green" />
            )}
          </View>
        )}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 30,
    paddingTop: '10%'
   },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  iconBtn: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 12,
    elevation: 2,
  },
  profileRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  greeting: { fontSize: 14, color: "#444" },
  subGreeting: { fontSize: 18, fontWeight: "500", color: "#000" },
  sectionTitle: { fontSize: 20, fontWeight: "600", marginVertical: 10 },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  dropdownText: { color: "#444", fontSize: 14 },
  locationCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  locationName: { fontSize: 15, fontWeight: "500", color: "#333" },
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
  },
});


export default ProfileLocation;