import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, TextInput, Alert } from 'react-native';
import { MaterialIcons, FontAwesome5, Entypo, Ionicons, } from '@expo/vector-icons';
import profileImage from '../../../assets/Profileboy.jpg';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useContext } from 'react';
import { AuthContext } from '../../AuthContext';


import Constants from 'expo-constants';
const { BASE_URL } = Constants.expoConfig.extra;
const API_URL_SETPROFILE = `${BASE_URL}/api/franchise/setProfile`;
const API_URL_GETPROFILE = `${BASE_URL}/api/franchise/getProfile`;
const API_URL_SETNAME = `${BASE_URL}/api/franchise/setName`;



const ProfilePage = ({ navigation }) => {
	const { loginData } = useContext(AuthContext);
	useEffect(() => {
		const fetchProfile = async () => {
			try {
				// Hit getProfile API
				const res = await fetch(API_URL_GETPROFILE, {
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

	
	const [modalVisible, setModalVisible] = useState(false);
	const [name, setName] = useState(loginData.data.name || "Guest User");
	const [newname, setnewName] = useState("");
	const [username, setUsername] = useState(loginData.data.email || "@guestuser");
	const [phone, setPhone] = useState(loginData.data.phone || "Not Provided");
	const [ProfileImage, setProfileImage] = useState(profileImage);
	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.7,
		});

		if (!result.canceled) {
			const selectedUri = result.assets[0];
			console.log("Selected image URI:", selectedUri.uri);
			setProfileImage(selectedUri);
		}
	};
	const savechangefunction = async () => {
  try {
    // normalize original values (be permissive about where profile/name may live)
    const originalName = (loginData?.data?.name || loginData?.name || "Guest User").toString();
    const originalPhone = (loginData?.data?.phone || loginData?.phone || "").toString();

    // originalProfileUri: try common places (state, loginData fields)
    const originalProfileUri =
      profileImage?.uri ||
      profileImage?.url ||
      loginData?.data?.profile ||
      loginData?.data?.profileUrl ||
      loginData?.profile ||
      null;

    // newProfileUri is selected file / uri (ProfileImage is the new image object in your code)
    const newProfileUri = ProfileImage?.uri || ProfileImage?.url || null;

    const isNameChanged = !!newname && newname.trim() !== originalName.trim();
    const isProfileChanged = !!newProfileUri && newProfileUri !== originalProfileUri;

    // Nothing changed -> notify and exit
    if (!isNameChanged && !isProfileChanged) {
      Alert.alert("No Changes", "There are no changes to save.");
      return;
    }

    // Prepare an updated copy of loginData to persist later
    const updatedLoginData = loginData ? { ...loginData } : { data: {} };
    if (!updatedLoginData.data) updatedLoginData.data = {};

    // Collect errors so we can show meaningful feedback
    const errors = [];
    let nameUpdated = false;
    let profileUpdated = false;

    // ---- Update name if changed ----
    if (isNameChanged) {
      try {
        const nameBody = { name: newname.trim(), phone: originalPhone };
        const nameRes = await fetch(API_URL_SETNAME, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nameBody),
        });

        if (!nameRes.ok) {
          // try to extract server message
          let text;
          try { text = await nameRes.text(); } catch { text = `Status ${nameRes.status}`; }
          throw new Error(text || `Status ${nameRes.status}`);
        }

        const nameJson = await nameRes.json().catch(() => null);
        // mark success & update cached data locally
        nameUpdated = true;
        updatedLoginData.data.name = newname.trim();
        // if API returned updated user object, merge useful fields
        if (nameJson && typeof nameJson === "object") {
          // common response shapes: { data: {...} } or { name: '...' }
          if (nameJson.data && typeof nameJson.data === "object") {
            updatedLoginData.data = { ...updatedLoginData.data, ...nameJson.data };
          } else {
            // fallback: keep the name we set
          }
        }
      } catch (err) {
        console.log("Name update error:", err);
        errors.push(`Name update failed: ${err?.message || err}`);
      }
    }

    // ---- Update profile if changed ----
    if (isProfileChanged) {
      try {
        // compute filename + mime type
        const filename = newProfileUri.split("/").pop();
        const match = /\.(\w+)$/.exec(filename || "");
        const ext = match ? match[1].toLowerCase() : "";
        let mimeType = "image/jpeg";
        if (ext === "png") mimeType = "image/png";
        else if (ext === "gif") mimeType = "image/gif";
        else if (ext === "jpg" || ext === "jpeg") mimeType = "image/jpeg";
        else if (ext) mimeType = `image/${ext}`;

        const formData = new FormData();
        // RN expects this object shape for file uploads
        formData.append("profile", { uri: newProfileUri, name: filename, type: mimeType });
        formData.append("phone", originalPhone);

        const profileRes = await fetch(API_URL_SETPROFILE, {
          method: "POST",
          // DO NOT set Content-Type header here — the runtime will set the correct multipart boundary
          body: formData,
        });

        if (!profileRes.ok) {
          let text;
          try { text = await profileRes.text(); } catch { text = `Status ${profileRes.status}`; }
          throw new Error(text || `Status ${profileRes.status}`);
        }

        const profileJson = await profileRes.json().catch(() => null);

        profileUpdated = true;
        // If server returned an URL for the stored profile, use it to update cache
        const profileUrl =
          profileJson?.profileUrl ||
          profileJson?.url ||
          profileJson?.data?.profile ||
          profileJson?.data?.profileUrl ||
          null;

        if (profileUrl) {
          updatedLoginData.data.profile = profileUrl;
        } else {
          // fallback: store the local uri so UI can immediately show the selected image
          updatedLoginData.data.profile = newProfileUri;
        }

        // update local UI state if you keep profileImage in state
        try {
          if (typeof setProfileImage === "function") setProfileImage(ProfileImage);
        } catch (e) {
          // ignore if setter doesn't exist in this scope
        }
      } catch (err) {
        console.log("Profile update error:", err);
        errors.push(`Profile update failed: ${err?.message || err}`);
      }
    }

    // ---- Persist updated cache if anything changed successfully ----
    if (nameUpdated || profileUpdated) {
      try {
        await AsyncStorage.setItem("loginData", JSON.stringify(updatedLoginData));
      } catch (e) {
        console.log("Failed to persist updated loginData:", e);
        // don't fail the whole flow for a cache write error — but inform user
        errors.push("Saved on server but failed to update local cache.");
      }

      // close modal after successful save(s)
      try {
        if (typeof setModalVisible === "function") setModalVisible(false);
      } catch (e) { /* ignore */ }

      // Compose user-friendly alert
      if (errors.length === 0) {
        const both = nameUpdated && profileUpdated;
        const msg = both
          ? "Name and profile updated successfully!"
          : nameUpdated
          ? "Name updated successfully!"
          : "Profile updated successfully!";
        Alert.alert("Success", msg);
      } else {
        // partial errors
        Alert.alert(
          "Partial Success",
          `Saved: ${nameUpdated ? "name " : ""}${profileUpdated ? "profile" : ""}.\n\nBut some issues occurred:\n${errors.join(
            "\n"
          )}`
        );
      }
      return;
    }

    // If we reach here, no updates were made (should have returned earlier), but keep safe-guard
    Alert.alert("No Changes", "There are no changes to save.");
  } catch (error) {
    console.log("Unexpected error in savechangefunction:", error);
    Alert.alert("Error", "Something went wrong while saving changes.");
  }
};



	return (

		<View style={styles.container}>
			{/* Notification Icon */}
			{/* <Ionicons name="notifications-outline" size={24} color="black" style={styles.notificationIcon} /> */}
			<MaterialIcons name="notifications-none" size={24} color="#222" onPress={() => navigation.navigate('Notifications')} style={styles.notificationIcon} />

			{/* Title */}
			<Text style={styles.title}>My Profile</Text>

			{/* Profile Section */}
			<View style={styles.profileSection}>
				<Image
					source={ProfileImage}
					style={styles.avatar}
				/>
				<View style={styles.profileInfo}>
					<Text style={styles.name}>{name}</Text>
					<Text style={styles.username}>{username}</Text>
					<TouchableOpacity style={styles.editBtn} onPress={() => setModalVisible(true)}>
						<Text style={styles.editBtnText}>Edit Profile</Text>
					</TouchableOpacity>
				</View>
			</View>

			{/* Menu List */}
			<View style={styles.menuList}>
				{/* <MenuItem icon={<FontAwesome5 name="rupee-sign" size={22} color="#222" />} label="Earnings" onPress={() => navigation.navigate('Earning')} /> */}
				<MenuItem icon={<Entypo name="location-pin" size={22} color="#222" />} label="Location" onPress={() => navigation.navigate('Location')} />
				<MenuItem icon={<MaterialIcons name="language" size={22} color="#222" />} label="Language" onPress={() => navigation.navigate('Language')} />
				{/* <MenuItem icon={<MaterialIcons name="card-membership" size={22} color="#222" />} label="Level" onPress={() => navigation.navigate('Level')} /> */}
				<MenuItem icon={<MaterialIcons name="logout" size={22} color="#222" />} label="Log Out" onPress={() => navigation.navigate('Logout')} />
			</View>
			<Modal
				visible={modalVisible}
				animationType="slide"
				transparent={true}
				onRequestClose={() => setModalVisible(false)}
			>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						{/* Close Button */}
						<TouchableOpacity
							style={styles.closeBtn}
							onPress={() => setModalVisible(false)}
						>
							<Ionicons name="close" size={24} color="black" />
						</TouchableOpacity>

						{/* Profile Image */}
						<View style={{ position: "relative", alignItems: "center" }}>
							<Image
								source={ProfileImage}
								style={styles.modalImage}
							/>
							<TouchableOpacity style={styles.imageUpload}
								onPress={pickImage}
							>
								<Ionicons name="add-circle" size={32} color="black" />
							</TouchableOpacity>
						</View>

						{/* Input Fields */}
						<Text style={{ width: '100%', textAlign: 'left' }}>Enter New Name</Text>
						<TextInput
							style={styles.input}
							placeholder={name}
							//   value={name}
							onChangeText={setnewName}
						/>
						{/* <Text style={{ width: '100%', textAlign: 'left', marginTop: 5 }}>{phone}</Text> */}
						{/* <TextInput
							style={styles.input}
							placeholder="Enter a new username"
							//   value={username}
							onChangeText={setUsername}
						/> */}

						{/* Save Changes */}
						<TouchableOpacity
							style={styles.saveBtn}
							onPress={() => savechangefunction()

							}
						>
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
	notificationIcon: {
		position: 'absolute',
		top: 40,
		right: 24,
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		alignSelf: 'center',
		marginTop: 16,
		marginBottom: 24,
		color: '#111',
	},
	profileSection: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 32,
		alignSelf: 'center',
		justifyContent: 'left',
		width: '100%',
	},
	avatar: {
		width: 70,
		height: 70,
		borderRadius: 35,
		marginRight: 18,
		backgroundColor: '#eee',
		borderWidth: 2,
		borderColor: 'black',
	},
	profileInfo: {
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	name: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#111',
	},
	username: {
		fontSize: 15,
		color: '#888',
		marginBottom: 8,
	},
	editBtn: {
		backgroundColor: '#f44',
		borderRadius: 7,
		paddingHorizontal: 22,
		paddingVertical: 7,
		alignSelf: 'flex-start',
	},
	editBtnText: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 15,
	},
	menuList: {
		marginTop: 12,
	},
	menuItem: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 13,
		borderBottomWidth: 0.5,
		borderBottomColor: '#eee',
	},
	menuIcon: {
		width: 32,
		alignItems: 'center',
	},
	menuLabel: {
		fontSize: 17,
		color: '#222',
		marginLeft: 10,
		flex: 1,
		fontWeight: '500',
	},
	chevron: {
		marginLeft: 8,
	},
	modalContainer: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.4)" },
	modalContent: {
		backgroundColor: "#fff",
		padding: '10%',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		alignItems: "center",
		height: '60%',
		justifyContent: 'center',
		// width:'80%'
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50
	},
	closeBtn: { position: "absolute", top: -40, right: 20, backgroundColor: '#fff', borderRadius: 20, padding: 3 },
	modalImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginBottom: 20,
		borderColor: 'black',
		borderWidth: 2,
	},
	imageUpload: {
		position: "absolute",
		bottom: 10,   // place near bottom
		right: 10,    // place at right corner
		backgroundColor: "#fff",
		borderRadius: 20,
	},

	// adjust based on image position
	input: {
		width: "100%",
		borderWidth: 1,
		borderColor: "#d9d9d9",
		borderRadius: 8,
		padding: 10,
		marginVertical: 10,
		backgroundColor: "#d9d9d9",
	},
	saveBtn: {
		backgroundColor: "black",
		padding: 12,
		borderRadius: 8,
		marginTop: 20,
		width: "100%",
		alignItems: "center",

	},
	saveText: { color: "#fff", fontWeight: "bold" },
});

export default ProfilePage;
