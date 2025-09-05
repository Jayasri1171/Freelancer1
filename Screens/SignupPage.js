import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Feather } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';

import TechnicianImg from '../assets/technician.png';

const areas = [
    "Korba Chowk",
    "High Tech Street",
    "Ring Road",
    "Ambedkar Chowk",
    "Commercial Center"
];

const services = [
    "Plumber",
    "Cleaner",
    "Electrician",
    "Technician"
];

const locations = [
    "Adarsh",
    "East Side",
    "Ring Road",
    "Rajgiri",
    "Kundeli"
];

const SignupPage = () => {
    const [checked, setChecked] = useState(false);
    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        service: '',
        location: '',
        areas: [],
        experience: '',
        aadhar: null,
        pan: null,
        certificate: null,
        bank: null,
    });

    const handleInput = (key, value) => {
        console.log(key, value);
        setForm({ ...form, [key]: value });
    }

    const handleAreaSelect = (area) => {
        setForm((prev) => {
            const exists = prev.areas.includes(area);
            return {
                ...prev,
                areas: exists
                    ? prev.areas.filter(a => a !== area)
                    : [...prev.areas, area]
            };
        });
    };
    const navigator = useNavigation();
    // Document picker handler
    const handleDocumentPick = async (key) => {
        console.log("Picking document for:", key);
        try {
            const res = await DocumentPicker.getDocumentAsync({
                type: "*/*",
                copyToCacheDirectory: true,
                multiple: false,
            });

            if (res.canceled) {
                console.log("User cancelled picking", key);
                return;
            }
            const asset = res.assets?.[0];
            if (!asset) {
                console.warn("No file selected");
                return;
            }

            const file = {
                uri: asset.uri,   
                name: asset.name || `${key}.pdf`,
                type: asset.mimeType || "application/octet-stream",
            };

            console.log("Selected file:", file);

            setForm((prev) => ({
                ...prev,
                [key]: file,
            }));
        } catch (err) {
            console.warn("DocumentPicker Error:", err);
        }
    };



    const handleSubmit = async () => {
        if (!checked) {
            alert("Please agree to Terms & Conditions before applying.");
            return;
        }

        try {
            const formData = new FormData();

            // Text fields
            formData.append("name", form.name);
            formData.append("phone", form.phone);
            formData.append("email", form.email);
            formData.append("service", form.service);
            formData.append("location", form.location);
            formData.append("areas", JSON.stringify(form.areas));
            formData.append("experience", form.experience);

            // ✅ All documents under the same key: "files"
            ["aadhar", "pan", "certificate", "bank"].forEach((key) => {
                if (form[key]) {
                    formData.append("files", {
                        uri: form[key].uri,
                        name: form[key].name,
                        type: form[key].type,
                    });
                }
            });

            console.log("Submitting form data...");
            const response = await fetch(
                "https://cube-backend-service.onrender.com/api/technician/register",
                {
                    method: "POST",
                    body: formData, 
                }
            );
            const text = await response.text();
            console.log("Server raw response:", text);

            if (response.ok) {
                alert("Application submitted successfully!");
                navigator.navigate("Page1");
            } else {
                alert("Failed to submit: " + text);
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Something went wrong, please try again.");
        }
    };




    return (
        <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} // adjust if needed
    >
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.topSection}>
                    <Image source={TechnicianImg} style={styles.techImage} />
                    <Text style={styles.quote}>
                        "Join as a Technician and Grow Your Work"
                    </Text>
                </View>
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

                    <Text style={styles.inputLabel}>Service you provide</Text>
                    <View style={styles.pickerBox}>
                        <Picker
                            selectedValue={form.service}
                            style={styles.picker}
                            onValueChange={value => handleInput('service', value)}
                        >
                            <Picker.Item label="Service you provide" value="" />
                            {services.map(s => (
                                <Picker.Item key={s} label={s} value={s} />
                            ))}
                        </Picker>
                    </View>

                    <Text style={styles.inputLabel}>Locations where you provide services</Text>
                    <View style={styles.pickerBox}>
                        <Picker
                            selectedValue={form.location}
                            style={styles.picker}
                            onValueChange={value => handleInput('location', value)}
                        >
                            <Picker.Item label="Locations where you provide services" value="" />
                            {locations.map(l => (
                                <Picker.Item key={l} label={l} value={l} />
                            ))}
                        </Picker>
                    </View>

                    <Text style={styles.sectionLabel}>Select 3 Areas</Text>
                    <View style={styles.areasBox}>
                        {areas.map(area => (
                            <TouchableOpacity
                                key={area}
                                style={[
                                    styles.areaItem,
                                    form.areas.includes(area) && styles.areaItemSelected
                                ]}
                                onPress={() => handleAreaSelect(area)}
                            >
                                <Text style={styles.areaText}>{area}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.inputLabel}>Experience *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="10+ years"
                        placeholderTextColor={"#888"}
                        value={form.experience}
                        onChangeText={text => handleInput('experience', text)}
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
                                <Feather name="upload" size={22} style={styles.uploadIcon} />
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
                                <Feather name="upload" size={22} style={styles.uploadIcon} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.uploadBox}>
                        <Text style={styles.uploadLabel}>Life Insurance Certificate</Text>
                        <TouchableOpacity
                            style={styles.uploadBtn}
                            onPress={() => handleDocumentPick('certificate')}
                        >
                            <View style={styles.uploadBtnContent}>
                                <View>
                                    <Text style={styles.uploadBtnText}>
                                        {form.certificate ? form.certificate.name || 'File Selected' : 'Upload your files here'}
                                    </Text>
                                    <Text style={styles.uploadBtnSubText}>Max 10 Mb*</Text>
                                </View>
                                <Feather name="upload" size={22} style={styles.uploadIcon} />
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
                                <Feather name="upload" size={22} style={styles.uploadIcon} />
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

                    <TouchableOpacity style={styles.applyBtn} onPress={handleSubmit}>
                        <Text style={styles.applyBtnText}>Apply</Text>
                    </TouchableOpacity>
                    <Text style={styles.accountText}>
                        Already have an <Text style={styles.accountLink}>Account?</Text>
                    </Text>
                </View>
            </ScrollView>
        </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D9CED4',
        alignItems: 'center',
    },
    topSection: {
        alignItems: 'center',
        marginTop: 18,
        marginBottom: 0,
    },
    accountLink: {
        color: '#2859C5',
        textDecorationLine: 'underline',
    },
    techImage: {
        // width: '100%',
        // height: '100%',
        resizeMode: 'contain',
        marginBottom: 8,
        width: 283,
        height: 421,
        top: 53,
        // left: 39,
        opacity: 1,

    },
    quote: {
        fontSize: 22,
        color: '#222',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
        width: 136,
        height: 112,
        position: 'absolute',
        top: 55,
        left: 190,
        zIndex: 10,
        textAlign: 'left'

    },
    scrollContent: {
        alignItems: 'center',
        paddingBottom: 30,
    },
    formBox: {
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 18,
        width: '95%',
        marginTop: 0,
        alignItems: 'center',
        minHeight: 600,
    },
    formTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#222',
        textAlign: 'center',
        marginBottom: 2,
        marginTop: 10,
    },
    formSubtitle: {
        fontSize: 12,
        color: '#888',
        textAlign: 'center',
        marginBottom: 18,
    },
    input: {
        width: '100%',
        backgroundColor: '#F3F3F3',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontSize: 15,
        marginBottom: 12,
        color: '#222',
        borderColor: '#888',
        borderWidth: 1,
    },
    inputLabel: {
        fontSize: 16,
        color: '#222',
        marginBottom: 2,
        marginTop: 8,
        alignSelf: 'flex-start',
        fontWeight: 500,
    },
    pickerBox: {
        width: '100%',
        backgroundColor: '#F3F3F3',
        borderRadius: 10,
        marginBottom: 12,
        justifyContent: 'center',
    },
    picker: {
        width: '100%',
        height: 52, // Increased height for better display
        color: '#222',
    },
    sectionLabel: {
        fontSize: 15,
        fontWeight: 500,
        color: '#222',
        marginBottom: 6,
        marginTop: 2,
        alignSelf: 'flex-start',
    },
    areasBox: {
        width: '100%',
        marginBottom: 12,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    areaItem: {
        backgroundColor: '#F3F3F3',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginRight: 6,
        marginBottom: 6,
    },
    areaItemSelected: {
        backgroundColor: '#2859C5',
    },
    areaText: {
        color: '#222',
        fontSize: 13,
    },
    uploadBox: {
        width: '100%',
        marginBottom: 10,
    },
    uploadLabel: {
        fontSize: 12,
        color: '#222',
        marginBottom: 2,
        fontWeight: 'bold',
    },
    uploadBtn: {
        backgroundColor: '#F3F3F3',
        borderRadius: 12,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#2859C5',
        paddingVertical: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 14,
        marginBottom: 8,
    },
    uploadBtnContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    uploadBtnText: {
        // color: '#2859C5',
        fontSize: 15,
        fontWeight: 400,
        alignItems: 'center',
    },
    uploadBtnSubText: {
        color: '#888',
        fontSize: 11,
        marginTop: 2,
    },
    uploadIcon: {
        marginLeft: 12,
    },
    termsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 8,
        width: '100%',
    },
    customCheckbox: {
        marginRight: 6,
    },
    checkboxBox: {
        width: 18,
        height: 18,
        borderRadius: 4,
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
        fontSize: 14,
        fontWeight: 'bold',
        lineHeight: 18,
    },
    termsText: {
        fontSize: 13,
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
        paddingVertical: 13,
        borderRadius: 14,
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 10,
    },
    applyBtnText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    accountText: {
        fontSize: 13,
        color: '#444',
        marginTop: 2,
        marginBottom: 8,
    },
});

export default SignupPage;
