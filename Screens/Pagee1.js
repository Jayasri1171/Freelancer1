import React, { useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
  Dimensions,
  Keyboard,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Mobile from '../assets/Mobilehand.png';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const API_URL = 'https://cube-backend-service.onrender.com/api/franchise/login';

const Page1 = () => {
  const route = useRoute();
  const navigator = useNavigation();

  const [checked, setChecked] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => setKeyboardHeight(e.endCoordinates.height)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardHeight(0)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    if (route.params?.agreed) setChecked(true);
  }, [route.params?.agreed]);

  // Check cache on mount
  useEffect(() => {
    const checkCache = async () => {
      try {
        const cachedLoginData = await AsyncStorage.getItem('loginData');
        if (cachedLoginData) {
          console.log('Cached loginData found, redirecting to HomeContainer');
          navigator.navigate("Container", { loginData: JSON.parse(cachedLoginData) });
          // navigator.navigate('Otpscreen', { loginData: data });
        }
      } catch (err) {
        console.log('Error reading cached loginData:', err);
      }
    };
    checkCache();
  }, []);

  const isValidPhone = useMemo(() => /^\d{10,15}$/.test(phoneNumber), [phoneNumber]);
  const disabled = !checked || !isValidPhone || submitting;

  const handleGetOtp = async () => {
    if (!checked) {
      Alert.alert('Terms required', 'Please agree to the Terms & Privacy Policy to continue.');
      return;
    }
    if (!isValidPhone) {
      Alert.alert('Invalid number', 'Enter a valid phone number.');
      return;
    }

    setSubmitting(true);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 20000);

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ phone: phoneNumber }),
        signal: controller.signal,
      });

      let data = null;
      try {
        data = await res.json();
        console.log('Response data:', data);
      } catch {
        data = null;
      }

      if (!res.ok) {
        const message = data?.message || data?.error || `Request failed with status ${res.status}`;
        throw new Error(message);
      }

      if (data?.message) {
        Alert.alert('OTP sent', "Enter the OTP we've sent to your phone.");
      }

      // Cache phone & loginData
      await AsyncStorage.setItem('userPhone', phoneNumber);
      await AsyncStorage.setItem('loginData', JSON.stringify(data));

      // Navigate to OTP screen
      navigator.navigate('Otpscreen', { loginData: data });

      clearTimeout(timeout);
    } catch (err) {
      const msg =
        err?.name === 'AbortError'
          ? 'Request timed out. Please check your connection and try again.'
          : err?.message || 'Something went wrong. Please try again.';
      Alert.alert('Couldn’t send OTP', msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image source={Mobile} style={styles.worker} />
      </View>
      <View style={[styles.content, { marginBottom: keyboardHeight }]}>
        <Text style={styles.title}>Verify Your Number</Text>
        <Text style={styles.subtitle}>Enter your number to receive a verification code</Text>

        <View style={styles.inputSection}>
          <TextInput
            style={styles.phoneNumber}
            keyboardType="phone-pad"
            placeholder="Enter phone number"
            placeholderTextColor="#aaa"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            maxLength={15}
          />
          <View style={styles.underline} />
        </View>

        <View style={styles.checkboxRow}>
          <TouchableOpacity style={styles.customCheckbox} onPress={() => setChecked(!checked)}>
            <View style={[styles.checkboxBox, checked && styles.checkboxBoxChecked]}>
              {checked && <Text style={styles.checkboxTick}>✓</Text>}
            </View>
          </TouchableOpacity>
          <Text style={styles.agreeText}>
            By continuing, you agree to our
            <Text style={styles.link} onPress={() => navigator.navigate('TermsPage')}>
              {' '}T&amp;C and Privacy policy
            </Text>
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.button, disabled && { opacity: 0.5 }]}
          disabled={disabled}
          onPress={handleGetOtp}
        >
          {submitting ? <ActivityIndicator size="small" /> : <Text style={styles.buttonText}>Get OTP</Text>}
        </TouchableOpacity>

        <Text style={styles.accountText}>
          Don't have an
          <Text style={styles.accountLink} onPress={() => navigator.navigate('SignupPage')}>
            {' '}Account?
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#D9CED4', alignItems: 'center', justifyContent: 'flex-end', gap: 0, position: 'relative' },
  topSection: { width: '100%', alignItems: 'center', height: height * 0.38, position: 'relative', top: 0 },
  worker: { width: '100%', height: '100%', resizeMode: 'contain' },
  content: { width: '92%', backgroundColor: 'white', borderTopLeftRadius: width * 0.12, borderTopRightRadius: width * 0.12, alignItems: 'center', paddingTop: height * 0.03, paddingBottom: height * 0.02, paddingHorizontal: width * 0.05 },
  title: { fontSize: width * 0.065, fontWeight: 'bold', textAlign: 'center', marginBottom: height * 0.01, color: '#111' },
  subtitle: { fontSize: width * 0.035, color: '#888', textAlign: 'center', marginBottom: height * 0.025 },
  inputSection: { width: '100%', alignItems: 'center', marginBottom: height * 0.045 },
  phoneNumber: { width: '60%', fontSize: width * 0.05, color: '#111', textAlign: 'center' },
  underline: { width: '60%', height: 2, backgroundColor: '#2859C5', marginTop: 2, borderRadius: 2 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: height * 0.02, width: '100%', paddingLeft: 10 },
  customCheckbox: { marginRight: 6 },
  checkboxBox: { width: width * 0.045, height: width * 0.045, borderRadius: 4, borderWidth: 2, borderColor: '#2859C5', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  checkboxBoxChecked: { backgroundColor: '#2859C5' },
  checkboxTick: { color: '#fff', fontSize: width * 0.035, fontWeight: 'bold' },
  agreeText: { fontSize: width * 0.03, color: '#444', flexShrink: 1 },
  link: { color: '#2859C5', textDecorationLine: 'underline' },
  button: { backgroundColor: '#2859C5', width: '90%', paddingVertical: height * 0.018, borderRadius: 14, alignItems: 'center', marginTop: height * 0.01, marginBottom: height * 0.012 },
  buttonText: { color: 'white', fontSize: width * 0.045, fontWeight: 'bold' },
  accountText: { fontSize: width * 0.034, color: '#444', marginTop: 2 },
  accountLink: { color: '#2859C5', textDecorationLine: 'underline' },
});

export default Page1;
