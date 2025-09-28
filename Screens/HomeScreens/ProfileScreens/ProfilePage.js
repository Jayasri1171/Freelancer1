import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, TextInput, Alert } from 'react-native';
import { MaterialIcons, FontAwesome5, Entypo, Ionicons, } from '@expo/vector-icons';
import profileImage from '../../../assets/Profileboy.jpg';
import { useRoute } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';



const ProfilePage = ({ navigation }) => {


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
				if (data?.profilePic) {
					setProfileImage({ uri: data.profilePic }); // backend returns profile URL
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

	const route = useRoute();
	const { loginData } = route.params;
	const [modalVisible, setModalVisible] = useState(false);
	const [name, setName] = useState(loginData.data.name || "Guest User");
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
			let changesMade = false;

			const originalName = loginData.data.name || "Guest User";
			const originalPhone = loginData.data.phone || "";
			const originalProfile = profileImage; // default image

			const isNameChanged = name.trim() !== originalName.trim();
			const isProfileChanged = ProfileImage?.uri && ProfileImage.uri !== originalProfile.uri;

			// No changes
			if (!isNameChanged && !isProfileChanged) {
				Alert.alert("No Changes", "There are no changes to save.");
				return;
			}

			// ✅ Name changed → hit setName API
			if (isNameChanged) {
				changesMade = true;
				const nameBody = {
					name: name,
					phone: originalPhone, // include phone as required
				};

				const nameResponse = await fetch(
					"https://cube-backend-service.onrender.com/api/franchise/setName",
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(nameBody),
					}
				);

				if (!nameResponse.ok) {
					throw new Error(`Failed to update name. Status: ${nameResponse.status}`);
				}

				const nameResult = await nameResponse.json();
				console.log("Name updated:", nameResult);
			}

			// ✅ Profile changed → hit setProfile API
			if (isProfileChanged) {
				changesMade = true;


				const filename = ProfileImage.uri.split("/").pop();
				const match = /\.(\w+)$/.exec(filename);
				const type = match ? `image/${match[1]}` : `image`;


				const formData = new FormData();
				formData.append("profile", { uri: ProfileImage.uri, name: filename, type });
				formData.append("phone", originalPhone);
				console.log("Uploading profile picture with data:", formData);
				const profileResponse = await fetch(
					"https://cube-backend-service.onrender.com/api/franchise/setProfile",
					{
						method: "POST",
						headers: { "Content-Type": "multipart/form-data" },
						body: formData,
					}
				);

				if (!profileResponse.ok) {
					throw new Error(
						`Failed to update profile picture. Status: ${profileResponse.status}`
					);
				}

				const profileResult = await profileResponse.json();
				console.log("Profile picture updated:", profileResult);
			}

			if (changesMade) {
				Alert.alert("Success", "Changes saved successfully!");
				// setProfileImage(ProfileImage);
				setModalVisible(false);
			}
		} catch (error) {
			console.error("Error saving changes:", error);
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
						<Text style={{ width: '100%', textAlign: 'left' }}>{name}</Text>
						<TextInput
							style={styles.input}
							placeholder="Enter a new name"
							//   value={name}
							onChangeText={setName}
						/>
						<Text style={{ width: '100%', textAlign: 'left', marginTop: 5 }}>{phone}</Text>
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
		marginTop: 40,
		width: "100%",
		alignItems: "center",

	},
	saveText: { color: "#fff", fontWeight: "bold" },
});

export default ProfilePage;
