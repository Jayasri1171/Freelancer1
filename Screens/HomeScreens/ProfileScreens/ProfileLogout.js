import React ,{useEffect}from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileLogout = ({ navigation }) => {
  const route = useRoute();
  const { loginData } = route.params;
  const [profileImage, setProfileImage] = React.useState(require("../../../assets/Profileboy.jpg"));
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Hit getProfile API
        const res = await fetch('https://cube-backend-service.onrender.com/api/franchise/getProfile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: loginData.data.phone, name: loginData.data.name }),
        });

        if (!res.ok) throw new Error(`Status: ${res.status}`);

        const data = await res.json();
        if (data?.signedUrl) {
          setProfileImage({ uri: data.signedUrl }); // backend returns profile URL
        } else {

          setProfileImage(profileImage); // fallback default
        }
      } catch (err) {
        console.log("Error fetching profile:", err);
        setProfileImage(profileImage); // fallback default
      }
    };

    fetchProfile();
  }, []);
  const handleLogout = async () => {
    try {
      // Clear cached login data
      await AsyncStorage.removeItem('loginData');
      await AsyncStorage.removeItem('userPhone');

      console.log("Logged out and cache cleared!");

      // Navigate back to login page
      navigation.replace("Page1");
    } catch (err) {
      console.log('Error clearing cache:', err);
      Alert.alert('Logout Failed', 'Could not clear cached data. Please try again.');
    }
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
      <View style={{ width: '90%', alignSelf: 'center' }}>
        <View style={styles.profileRow}>
          <Image
            source={profileImage}
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
    flex: 1, backgroundColor: "#fff", padding: 20,
    paddingTop: '5%',
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  iconBtn: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 12,
    elevation: 10,
  },
  profileRow: { flexDirection: "row", alignItems: "center", marginBottom: 20, gap: 10 },
  profileImg: {
    width: 55,
    height: 55,
    borderRadius: 55,
    marginRight: 10,
  },
  welcomeText: {
    fontSize: 12,
    color: "#333",
  },
  subText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",

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