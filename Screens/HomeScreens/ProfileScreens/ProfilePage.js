import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, TextInput } from 'react-native';
import { MaterialIcons, FontAwesome5, Entypo, Ionicons } from '@expo/vector-icons';
import ProfileImage from '../../../assets/Profileboy.jpg';
import { useRoute } from "@react-navigation/native";

const ProfilePage = ({ navigation }) => {
	const route = useRoute();
	const { loginData } = route.params;
	const [modalVisible, setModalVisible] = useState(false);
	 const [name, setName] = useState(loginData.data.name || "Guest User");
  const [username, setUsername] = useState(loginData.data.email || "@guestuser");
  const [phone, setPhone] = useState(loginData.data.phone || "Not Provided");
	
	return (

		<View style={styles.container}>
			{/* Notification Icon */}
			<Ionicons name="notifications-outline" size={24} color="black" style={styles.notificationIcon} />

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
				<MenuItem icon={<FontAwesome5 name="rupee-sign" size={22} color="#222" />} label="Earnings" onPress={() => navigation.navigate('Earning')} />
				<MenuItem icon={<Entypo name="location-pin" size={22} color="#222" />} label="Location" onPress={() => navigation.navigate('Location')} />
				<MenuItem icon={<MaterialIcons name="language" size={22} color="#222" />} label="Language" onPress={() => navigation.navigate('Language')} />
				<MenuItem icon={<MaterialIcons name="card-membership" size={22} color="#222" />} label="Level" onPress={() => navigation.navigate('Level')} />
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
						<Image
							source={ProfileImage}
							style={styles.modalImage}
						/>
						<TouchableOpacity style={styles.imageUpload}>
							{/* <Ionicons name="add-circle" size={28} color="black" /> */}
						</TouchableOpacity>

						{/* Input Fields */}
						<Text style={{ width: '100%', textAlign: 'left' }}>{name}</Text>
						<TextInput
							style={styles.input}
							placeholder="Enter a new name"
							//   value={name}
							onChangeText={setName}
						/>
						<Text style={{ width: '100%', textAlign: 'left' }}>{username}</Text>
						<TextInput
							style={styles.input}
							placeholder="Enter a new username"
							//   value={username}
							onChangeText={setUsername}
						/>

						{/* Save Changes */}
						<TouchableOpacity
							style={styles.saveBtn}
							onPress={() => setModalVisible(false)}
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
	modalContainer: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.4)"},
	modalContent: {
		backgroundColor: "#fff",
		padding: '10%',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		alignItems: "center",
		height: '60%',
		justifyContent:'center',
		// width:'80%'
		borderTopLeftRadius:50,
		 borderTopRightRadius:50
	},
	closeBtn: { position: "absolute", top: -40, right: 20 , backgroundColor:'#fff', borderRadius:20, padding:3},
	modalImage: { 
		width: 90,
		 height: 90, 
		 borderRadius: 50, 
		 marginBottom: 10 ,
		 borderColor:'black',
		 borderWidth:2,
		 position:'relative',
		 marginBottom:50
		},
	imageUpload: {
		 position: "absolute", 
		 top: 125,
		  left: 220,
		  color:'white'
		 }, // adjust based on image position
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
