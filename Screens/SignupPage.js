import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
    Platform,
    Keyboard,
    Dimensions,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { Feather } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";

import TechnicianImg from '../assets/technician.png';


import Constants from 'expo-constants';
const { BASE_URL } = Constants.expoConfig.extra;
const API_URL = `${BASE_URL}/api/franchise/register`;



const { width, height } = Dimensions.get('window');

const scale = (size) => (width / 375) * size;
const verticalScale = (size) => (height / 812) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;



const SignupPage = () => {
    const route = useRoute();
    const [checked, setChecked] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);


    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        city: '',
        location: '',
        aadhar: null,
        pan: null,
        bank: null,
    });

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            (e) => {
                setKeyboardHeight(e.endCoordinates.height);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            () => {
                setKeyboardHeight(0);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    useEffect(() => {
        if (route.params?.agreed) {
            setChecked(true);
        }
    }, [route.params?.agreed]);

    const handleInput = (key, value) => {
        setForm({ ...form, [key]: value });
    }


    const [loading, setLoading] = useState(false);

    const navigator = useNavigation();

    // Document picker handler
    const handleDocumentPick = async (key) => {
        try {
            const res = await DocumentPicker.getDocumentAsync({
                type: "*/*",
                copyToCacheDirectory: true,
                multiple: false,
            });

            if (res.canceled) {
                return;
            }
            const asset = res.assets?.[0];
            if (!asset) {
                return;
            }

            const file = {
                uri: asset.uri,
                name: asset.name || `${key}.pdf`,
                type: asset.mimeType || "application/octet-stream",
            };

            setForm((prev) => ({
                ...prev,
                [key]: file,
            }));
        } catch (err) {
            console.log("DocumentPicker Error:", err);
        }
    };

    const handleSubmit = async () => {
        // --- Validations ---
        if (!form.name || !form.phone || !form.email || !form.city || !form.location) {
            Toast.show({ type: "error", text1: "All fields are required" });
            return;
        }
        if (!/^\d{10}$/.test(form.phone)) {
            Toast.show({ type: "error", text1: "Enter a valid 10-digit phone number" });
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            Toast.show({ type: "error", text1: "Enter a valid email address" });
            return;
        }
        if (!form.aadhar || !form.pan || !form.bank) {
            Toast.show({ type: "error", text1: "Please upload all required documents" });
            return;
        }
        if (!checked) {
            Toast.show({ type: "error", text1: "You must agree to Terms & Conditions" });
            return;
        }

        try {

            setLoading(true);
            const formData = new FormData();

            // Text fields
            formData.append("name", form.name);
            formData.append("phone", form.phone);
            formData.append("email", form.email);
            formData.append("city", form.city);
            formData.append("location", form.location);


            // Documents
            ["aadhar", "pan", "bank"].forEach((key) => {
                if (form[key]) {
                    formData.append("files", {
                        uri: form[key].uri,
                        name: form[key].name,
                        type: form[key].type,
                    });
                }
            });
            console.log(formData)
            const response = await fetch(API_URL,
                {
                    method: "POST",
                    body: formData,
                }
            );
            const text = await response.json().catch(() => null);

            if (response.ok) {
                Toast.show({ type: "success", text1: "Application submitted successfully!" });
                setTimeout(() => {
                    navigator.navigate("Page1");
                }, 1000);
            } else {
                Toast.show({ type: "error", text1: "Failed to submit", text2: text });
            }
        } catch (error) {
            console.log("Upload error:", error);
            Toast.show({ type: "error", text1: "Something went wrong, try again" });
        } finally {
            setLoading(false); // stop loader
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={[styles.scrollContent, { paddingBottom: keyboardHeight > 0 ? verticalScale(20) : verticalScale(0) }]}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Top Image Section - Hidden when keyboard is open */}
                {keyboardHeight === 0 && (
                    <View style={styles.topSection}>
                        <Image source={TechnicianImg} style={styles.techImage} />
                        <Text style={styles.quote}>
                            “Grow your business with our franchise.”
                        </Text>
                    </View>
                )}

                <View style={styles.formBox}>
                    <Text style={styles.formTitle}>Start Getting Jobs Today</Text>
                    <Text style={styles.formSubtitle}>Enter the OTP sent to (+91 8688148575)</Text>

                    <Text style={styles.inputLabel}>Name *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="John Wick"
                        placeholderTextColor="#888"
                        value={form.name}
                        onChangeText={text => handleInput('name', text)}
                    />

                    <Text style={styles.inputLabel}>Phone Number *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="8688148575"
                        placeholderTextColor="#888"
                        keyboardType="phone-pad"
                        value={form.phone}
                        onChangeText={text => handleInput('phone', text)}
                    />

                    <Text style={styles.inputLabel}>Email *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="johnwick@gmail.com"
                        placeholderTextColor="#888"
                        keyboardType="email-address"
                        value={form.email}
                        onChangeText={text => handleInput('email', text)}
                    />

                    <Text style={styles.inputLabel}>Enter Your City </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Select Your City"
                        placeholderTextColor={"#888"}
                        value={form.experience}
                        onChangeText={text => handleInput('city', text)}
                    />
                    <Text style={styles.inputLabel}>Enter Your Location </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Select Your Location"
                        placeholderTextColor={"#888"}
                        value={form.experience}
                        onChangeText={text => handleInput('location', text)}
                    />

                    <Text style={styles.sectionLabel}>Required Documents *</Text>

                    <View style={styles.uploadBox}>
                        <Text style={styles.uploadLabel}>Aadhar Card</Text>
                        <TouchableOpacity
                            style={styles.uploadBtn}
                            onPress={() => handleDocumentPick('aadhar')}
                        >
                            <View style={styles.uploadBtnContent}>
                                <View>
                                    <Text style={styles.uploadBtnText}>
                                        {form.aadhar ? form.aadhar.name || 'File Selected' : 'Upload your files here'}
                                    </Text>
                                    <Text style={styles.uploadBtnSubText}>Max 10 Mb*</Text>
                                </View>
                                <Feather name="upload" size={moderateScale(22)} style={styles.uploadIcon} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.uploadBox}>
                        <Text style={styles.uploadLabel}>PAN Card</Text>
                        <TouchableOpacity
                            style={styles.uploadBtn}
                            onPress={() => handleDocumentPick('pan')}
                        >
                            <View style={styles.uploadBtnContent}>
                                <View>
                                    <Text style={styles.uploadBtnText}>
                                        {form.pan ? form.pan.name || 'File Selected' : 'Upload your files here'}
                                    </Text>
                                    <Text style={styles.uploadBtnSubText}>Max 10 Mb*</Text>
                                </View>
                                <Feather name="upload" size={moderateScale(22)} style={styles.uploadIcon} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.uploadBox}>
                        <Text style={styles.uploadLabel}>Bank Details (IFSC code)</Text>
                        <TouchableOpacity
                            style={styles.uploadBtn}
                            onPress={() => handleDocumentPick('bank')}
                        >
                            <View style={styles.uploadBtnContent}>
                                <View>
                                    <Text style={styles.uploadBtnText}>
                                        {form.bank ? form.bank.name || 'File Selected' : 'Upload your files here'}
                                    </Text>
                                    <Text style={styles.uploadBtnSubText}>Max 10 Mb*</Text>
                                </View>
                                <Feather name="upload" size={moderateScale(22)} style={styles.uploadIcon} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.termsRow}>
                        <TouchableOpacity
                            style={styles.customCheckbox}
                            onPress={() => setChecked(!checked)}
                            activeOpacity={0.7}
                        >
                            <View style={[
                                styles.checkboxBox,
                                checked && styles.checkboxBoxChecked
                            ]}>
                                {checked && <Text style={styles.checkboxTick}>✓</Text>}
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.termsText}>
                            Agree with <Text style={styles.link} onPress={() => navigator.navigate("TermsPage")}>Terms & Conditions</Text>
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.applyBtn} onPress={handleSubmit} disabled={loading}  >

                        <Text style={styles.applyBtnText}>Join as a Franchise</Text>

                    </TouchableOpacity>

                    <Text style={styles.accountText}>
                        Already have an <Text style={styles.accountLink} onPress={() => navigator.navigate("Page1")}>Account?</Text>
                    </Text>
                </View>
            </ScrollView>

            {loading && (
                <View style={styles.loaderOverlay}>
                    <ActivityIndicator size="large" color="#2859C5" />
                    <Text style={styles.loaderText}>Submitting your application...</Text>
                </View>
            )}
            <Toast position="top" topOffset={50} />
        </View>
    );
};

// Keep the same styles as before, they are already responsive
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D9CED4',
    },
    scrollContent: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: "flex-end"
    },
    topSection: {
        alignItems: 'center',
        // marginTop: verticalScale(18),
        position: "relative"
    },
    // techImage: {
    //     width: width * 0.9,
    //     height: verticalScale(421),
    //     resizeMode: 'contain',
    //     backgroundColor:"red",

    // },
    techImage: {
        width: "100%",               // take full width of container
        aspectRatio: 1.5,            // adjust this ratio to match your image (try 1.5–2)
        resizeMode: "contain",
        transform: [{ translateX: -50 }],
        top: "6%"
        //   alignSelf: "right",
    },
    quote: {
        // width:moderateScale(22),
        fontSize: moderateScale(18),
        color: '#222',
        fontWeight: 'bold',
        textAlign: 'auto',
        position: "absolute",
        top: "17%",
        left: "105%",
        // maxWidth:"25%",
        height: "auto",
        // marginBottom: 8,
        width: 136,
        height: 92,
        position: 'absolute',
        //    backgroundColor:'red',
        textAlign: 'left'
    },
    formBox: {
        backgroundColor: 'white',
        borderTopLeftRadius: moderateScale(40),
        borderTopRightRadius: moderateScale(40),
        padding: moderateScale(18),
        width: '95%',
        alignItems: 'center',
    },
    formTitle: {
        fontSize: moderateScale(22),
        fontWeight: 'bold',
        color: '#222',
        textAlign: 'center',
        marginBottom: verticalScale(2),
        marginTop: verticalScale(10),
    },
    formSubtitle: {
        fontSize: moderateScale(12),
        color: '#888',
        textAlign: 'center',
        marginBottom: verticalScale(18),
    },
    input: {
        width: '100%',
        backgroundColor: '#F3F3F3',
        borderRadius: moderateScale(10),
        paddingHorizontal: moderateScale(14),
        paddingVertical: verticalScale(10),
        fontSize: moderateScale(15),
        marginBottom: verticalScale(12),
        color: '#222',
        borderColor: '#888',
        borderWidth: 1,
    },
    inputLabel: {
        fontSize: moderateScale(16),
        color: '#222',
        marginBottom: verticalScale(2),
        marginTop: verticalScale(8),
        alignSelf: 'flex-start',
        fontWeight: '500',
    },
    pickerBox: {
        width: '100%',
        backgroundColor: '#F3F3F3',
        borderRadius: moderateScale(10),
        marginBottom: verticalScale(12),
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#888',
    },
    picker: {
        width: '100%',
        height: verticalScale(52),
        color: '#222',
    },
    sectionLabel: {
        fontSize: moderateScale(15),
        fontWeight: '500',
        color: '#222',
        marginBottom: verticalScale(6),
        marginTop: verticalScale(2),
        alignSelf: 'flex-start',
    },
    areasBox: {
        width: '100%',
        marginBottom: verticalScale(12),
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: moderateScale(6),
    },
    areaItem: {
        backgroundColor: '#F3F3F3',
        borderRadius: moderateScale(8),
        paddingHorizontal: moderateScale(10),
        paddingVertical: verticalScale(6),
    },
    areaItemSelected: {
        backgroundColor: '#2859C5',
    },
    areaText: {
        color: '#222',
        fontSize: moderateScale(13),
    },
    areaTextSelected: {
        color: 'white',
    },
    uploadBox: {
        width: '100%',
        marginBottom: verticalScale(10),
    },
    uploadLabel: {
        fontSize: moderateScale(12),
        color: '#222',
        marginBottom: verticalScale(2),
        fontWeight: 'bold',
    },
    uploadBtn: {
        backgroundColor: '#F3F3F3',
        borderRadius: moderateScale(12),
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#2859C5',
        paddingVertical: verticalScale(10),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(14),
        marginBottom: verticalScale(8),
    },
    uploadBtnContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    uploadBtnText: {
        fontSize: moderateScale(15),
        fontWeight: '400',
    },
    uploadBtnSubText: {
        color: '#888',
        fontSize: moderateScale(11),
        marginTop: verticalScale(2),
    },
    uploadIcon: {
        marginLeft: moderateScale(12),
        color: '#2859C5',
    },
    termsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(10),
        marginTop: verticalScale(8),
        width: '100%',
    },
    customCheckbox: {
        marginRight: moderateScale(6),
    },
    checkboxBox: {
        width: moderateScale(18),
        height: moderateScale(18),
        borderRadius: moderateScale(4),
        borderWidth: 2,
        borderColor: '#2859C5',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxBoxChecked: {
        backgroundColor: '#2859C5',
    },
    checkboxTick: {
        color: '#fff',
        fontSize: moderateScale(14),
        fontWeight: 'bold',
    },
    termsText: {
        fontSize: moderateScale(13),
        color: '#444',
        flexShrink: 1,
    },
    link: {
        color: '#2859C5',
        textDecorationLine: 'underline',
    },
    applyBtn: {
        backgroundColor: '#2859C5',
        width: '100%',
        paddingVertical: verticalScale(13),
        borderRadius: moderateScale(14),
        alignItems: 'center',
        marginTop: verticalScale(8),
        marginBottom: verticalScale(10),
    },
    applyBtnText: {
        color: 'white',
        fontSize: moderateScale(18),
        fontWeight: 'bold',
    },
    accountText: {
        fontSize: moderateScale(13),
        color: '#444',
        marginTop: verticalScale(2),
        marginBottom: verticalScale(8),
    },
    accountLink: {
        color: '#2859C5',
        textDecorationLine: 'underline',
    },
    applyButton: {
        backgroundColor: "#007AFF",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },
    applyButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },


     loaderOverlay: {
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.3)", justifyContent: "center", alignItems: "center", zIndex: 999,
    },
    loaderText: { marginTop: 10, color: "#2859C5", fontSize: moderateScale(16), fontWeight: "500" },

});



export default SignupPage;