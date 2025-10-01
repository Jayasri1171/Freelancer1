import React, { useEffect, useState, useRef, useContext } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, Image, Modal, TextInput, 
  ActivityIndicator, Animated, Dimensions, ScrollView 
} from 'react-native';
import { MaterialIcons, Entypo, Ionicons } from '@expo/vector-icons';
import profileImage from '../../../assets/Profileboy.jpg';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../AuthContext';
import Constants from 'expo-constants';

const { BASE_URL } = Constants.expoConfig.extra;
const API_URL_SETPROFILE = `${BASE_URL}/api/franchise/setProfile`;
const API_URL_GETPROFILE = `${BASE_URL}/api/franchise/getProfile`;
const API_URL_SETNAME = `${BASE_URL}/api/franchise/setName`;

const { width } = Dimensions.get('window');

const ProfilePage = ({ navigation }) => {
  const { loginData } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [ProfileImage, setProfileImage] = useState(profileImage);
  const [name, setName] = useState(loginData.data.name || "Guest User");
  const [newname, setnewName] = useState("");
  const [username, setUsername] = useState(loginData.data.email || "@guestuser");
  const [phone, setPhone] = useState(loginData.data.phone || "Not Provided");
  const [modalVisible, setModalVisible] = useState(false);

  // Animated skeleton opacity
  const fadeAnim = useRef(new Animated.Value(0.3)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(API_URL_GETPROFILE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: loginData.data.phone, name: loginData.data.name }),
        });

        if (!res.ok) throw new Error(`Status: ${res.status}`);

        const data = await res.json();
        if (data?.signedUrl) setProfileImage({ uri: data.signedUrl });
        else setProfileImage(profileImage);
      } catch (err) {
        console.log("Error fetching profile:", err);
        setProfileImage(profileImage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      const selectedUri = result.assets[0];
      setProfileImage(selectedUri);
    }
  };

  const savechangefunction = async () => {
    try {
      const originalName = (loginData?.data?.name || "Guest User").toString();
      const originalPhone = (loginData?.data?.phone || "").toString();
      const originalProfileUri =
        profileImage?.uri ||
        loginData?.data?.profile ||
        loginData?.profile ||
        null;
      const newProfileUri = ProfileImage?.uri || ProfileImage?.url || null;

      const isNameChanged = !!newname && newname.trim() !== originalName.trim();
      const isProfileChanged = !!newProfileUri && newProfileUri !== originalProfileUri;

      if (!isNameChanged && !isProfileChanged) {
        alert("No Changes to save.");
        return;
      }

      const updatedLoginData = loginData ? { ...loginData } : { data: {} };
      if (!updatedLoginData.data) updatedLoginData.data = {};

      const errors = [];
      let nameUpdated = false;
      let profileUpdated = false;

      // Update Name
      if (isNameChanged) {
        try {
          const res = await fetch(API_URL_SETNAME, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: newname.trim(), phone: originalPhone }),
          });
          if (!res.ok) throw new Error(`Failed to update name`);
          const data = await res.json().catch(() => null);
          nameUpdated = true;
          updatedLoginData.data.name = newname.trim();
        } catch (err) {
          console.log("Name update error:", err);
          errors.push("Name update failed");
        }
      }

      // Update Profile
      if (isProfileChanged) {
        try {
          const filename = newProfileUri.split("/").pop();
          const match = /\.(\w+)$/.exec(filename || "");
          const ext = match ? match[1].toLowerCase() : "";
          let mimeType = "image/jpeg";
          if (ext === "png") mimeType = "image/png";

          const formData = new FormData();
          formData.append("profile", { uri: newProfileUri, name: filename, type: mimeType });
          formData.append("phone", originalPhone);

          const profileRes = await fetch(API_URL_SETPROFILE, {
            method: "POST",
            body: formData,
          });

          if (!profileRes.ok) throw new Error("Failed to update profile");

          const profileJson = await profileRes.json().catch(() => null);
          profileUpdated = true;
          updatedLoginData.data.profile = profileJson?.profileUrl || newProfileUri;
          setProfileImage(ProfileImage);
        } catch (err) {
          console.log("Profile update error:", err);
          errors.push("Profile update failed");
        }
      }

      if (nameUpdated || profileUpdated) {
        try {
          await AsyncStorage.setItem("loginData", JSON.stringify(updatedLoginData));
        } catch (e) {
          console.log("Failed to persist data", e);
          errors.push("Saved on server but failed to update local cache.");
        }
        setModalVisible(false);
        alert(errors.length === 0 ? "Profile updated successfully!" : `Partial success: ${errors.join(", ")}`);
      } else {
        alert("No changes detected.");
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong while saving changes.");
    }
  };

  // ---------- Skeleton Loader ----------
  if (isLoading) {
    return (
      <ScrollView contentContainerStyle={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Animated.View style={[styles.skeletonCircle, { opacity: fadeAnim }]} />
        <Animated.View style={[styles.skeletonText, { width: 140, opacity: fadeAnim, marginTop: 16 }]} />
        <Animated.View style={[styles.skeletonText, { width: 100, opacity: fadeAnim, marginTop: 8 }]} />

        {[...Array(4)].map((_, i) => (
          <Animated.View key={i} style={[styles.skeletonRow, { opacity: fadeAnim, marginTop: 20 }]} />
        ))}
      </ScrollView>
    );
  }

  // ---------- Main UI ----------
  return (
    <View style={styles.container}>
      <MaterialIcons name="notifications-none" size={24} color="#222" onPress={() => navigation.navigate('Notifications')} style={styles.notificationIcon} />
      <Text style={styles.title}>My Profile</Text>

      <View style={styles.profileSection}>
        <Image source={ProfileImage} style={styles.avatar} />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.username}>{username}</Text>
          <TouchableOpacity style={styles.editBtn} onPress={() => setModalVisible(true)}>
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.menuList}>
        <MenuItem icon={<Entypo name="location-pin" size={22} color="#222" />} label="Location" onPress={() => navigation.navigate('Location')} />
        <MenuItem icon={<MaterialIcons name="language" size={22} color="#222" />} label="Language" onPress={() => navigation.navigate('Language')} />
        <MenuItem icon={<MaterialIcons name="logout" size={22} color="#222" />} label="Log Out" onPress={() => navigation.navigate('Logout')} />
      </View>

      {/* Edit Profile Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>

            <View style={{ position: "relative", alignItems: "center" }}>
              <Image source={ProfileImage} style={styles.modalImage} />
              <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
                <Ionicons name="add-circle" size={32} color="black" />
              </TouchableOpacity>
            </View>

            <Text style={{ width: '100%', textAlign: 'left' }}>Enter New Name</Text>
            <TextInput style={styles.input} placeholder={name} onChangeText={setnewName} />

            <TouchableOpacity style={styles.saveBtn} onPress={savechangefunction}>
              <Text style={styles.saveText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const MenuItem = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuIcon}>{icon}</View>
    <Text style={styles.menuLabel}>{label}</Text>
    <MaterialIcons name="chevron-right" size={24} color="#888" style={styles.chevron} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: '15%',
    paddingHorizontal: '10%',
  },
  notificationIcon: { position: 'absolute', top: 40, right: 24 },
  title: { fontSize: 28, fontWeight: 'bold', alignSelf: 'center', marginTop: 16, marginBottom: 24, color: '#111' },
  profileSection: { flexDirection: 'row', alignItems: 'center', marginBottom: 32, alignSelf: 'center', justifyContent: 'flex-start', width: '100%' },
  avatar: { width: 70, height: 70, borderRadius: 35, marginRight: 18, backgroundColor: '#eee', borderWidth: 2, borderColor: 'black' },
  profileInfo: { justifyContent: 'center', alignItems: 'flex-start' },
  name: { fontSize: 20, fontWeight: 'bold', color: '#111' },
  username: { fontSize: 15, color: '#888', marginBottom: 8 },
  editBtn: { backgroundColor: '#f44', borderRadius: 7, paddingHorizontal: 22, paddingVertical: 7, alignSelf: 'flex-start' },
  editBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  menuList: { marginTop: 12 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 13, borderBottomWidth: 0.5, borderBottomColor: '#eee' },
  menuIcon: { width: 32, alignItems: 'center' },
  menuLabel: { fontSize: 17, color: '#222', marginLeft: 10, flex: 1, fontWeight: '500' },
  chevron: { marginLeft: 8 },
  modalContainer: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.4)" },
  modalContent: { backgroundColor: "#fff", padding: '10%', borderTopLeftRadius: 50, borderTopRightRadius: 50, alignItems: "center", height: '60%', justifyContent: 'center' },
  closeBtn: { position: "absolute", top: -40, right: 20, backgroundColor: '#fff', borderRadius: 20, padding: 3 },
  modalImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 20, borderColor: 'black', borderWidth: 2 },
  imageUpload: { position: "absolute", bottom: 10, right: 10, backgroundColor: "#fff", borderRadius: 20 },
  input: { width: "100%", borderWidth: 1, borderColor: "#d9d9d9", borderRadius: 8, padding: 10, marginVertical: 10, backgroundColor: "#d9d9d9" },
  saveBtn: { backgroundColor: "black", padding: 12, borderRadius: 8, marginTop: 20, width: "100%", alignItems: "center" },
  saveText: { color: "#fff", fontWeight: "bold" },

  // Skeleton styles
  skeletonCircle: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#eee', marginTop: 20 },
  skeletonText: { height: 16, borderRadius: 4, backgroundColor: '#eee' },
  skeletonRow: { width: '100%', height: 50, borderRadius: 8, backgroundColor: '#eee' },
});

export default ProfilePage;
