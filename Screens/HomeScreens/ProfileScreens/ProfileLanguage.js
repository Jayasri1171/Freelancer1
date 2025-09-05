import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from '@react-navigation/native';


const ProfileLanguage = () => {
    const [selectedLang, setSelectedLang] = useState("English");
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
                </View>

                {/* Title */}
                <Text style={styles.sectionTitle}>Select Language</Text>

                {/* Dropdown */}
                <View style={styles.dropdown}>
                    <Picker
                        selectedValue={""} // always keep empty so it shows "Select Language"
                        onValueChange={(itemValue) => {
                            if (itemValue !== "") setSelectedLang(itemValue); // update only in state
                        }}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select Language" value="" />
                        <Picker.Item label="English" value="English" />
                        <Picker.Item label="Telugu" value="Telugu" />
                        <Picker.Item label="Hindi" value="Hindi" />
                        <Picker.Item label="Tamil" value="Tamil" />
                    </Picker>
                </View>

                {/* Selected Language */}
                {selectedLang !== "" && (
                    <View style={styles.langCard}>
                        <Text style={styles.langText}>{selectedLang}</Text>
                        <MaterialIcons name="check-circle" size={18} color="green" />
                    </View>
                )}
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: "#fff", padding: 20,
        paddingTop: '10%',
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
    dropdown: {
        backgroundColor: "#eee",
        borderRadius: 10,
        marginBottom: 15,
        overflow: "hidden",
    },
    picker: { height: 50, width: "100%" },
    langCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#eee",
        padding: 14,
        borderRadius: 10,
        marginBottom: 10,
    },
    langText: { fontSize: 15, fontWeight: "500", color: "#333" },
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
    navBtn: { alignItems: "center", justifyContent: "center" },
});


export default ProfileLanguage;