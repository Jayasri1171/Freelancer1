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
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import Mobile from '../assets/Mobilehand.png';
import { useNavigation} from '@react-navigation/native';
import Constants from 'expo-constants';
import Toast from 'react-native-toast-message';
import { useAuth } from './AuthContext';

const { BASE_URL } = Constants.expoConfig.extra;


const { width, height } = Dimensions.get('window');
const API_URL = `${BASE_URL}/api/franchise/login`;





const Page1 = () => {

  const { login, loginData } = useAuth();  // login function from context

  const navigator = useNavigation();



  const [checked, setChecked] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [submitting, setSubmitting] = useState(false);




  useEffect(() => {
    if (loginData) {
      // console.log("Already logged in, navigating to Container");
      navigator.navigate('Container');
    }
  }, [loginData]);

  const isValidPhone = useMemo(() => /^\d{10}$/.test(phoneNumber), [phoneNumber]);
  const disabled = !checked || !isValidPhone || submitting;

  const handleGetOtp = async () => {
    if (!checked) {
      Toast.show({ type: 'error', text1: 'Terms required', text2: 'Please agree to Terms & Privacy Policy.' });
      return;
    }
    if (!/^\d{10}$/.test(phoneNumber)) {
      Toast.show({ type: 'error', text1: 'Invalid number', text2: 'Enter a valid 10-digit phone number.' });
      return;
    }

    setSubmitting(true);  // ✅ start
    try {
      await login(phoneNumber);   // context handles API + AsyncStorage
      Toast.show({
        type: 'success',
        text1: 'OTP sent',
        text2: "Enter the OTP we've sent to your phone.",
        visibilityTime: 1000,
      });
      setTimeout(() => {
        navigator.navigate('Otpscreen');  // no need to pass loginData
      }, 1000);
    } catch (err) {
      Toast.show({ type: 'error', text1: 'Couldn’t send OTP', text2: err.message });
    } finally {
      setSubmitting(false);  // ✅ stop
    }
  };



  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Image source={Mobile} style={styles.worker} />
        </View>
        <View style={[styles.content]}>
          <Text style={styles.title}>Verify Your Number</Text>
          <Text style={styles.subtitle}>Enter your number to receive a verification code</Text>

          <View style={styles.inputSection}>
            <TextInput
              style={styles.phoneNumber}
              keyboardType="phone-pad"
              placeholder="Enter phone number"
              placeholderTextColor="#aaa"
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text.replace(/[^0-9]/g, '').slice(0, 10))}
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
        {submitting && (
          <View style={styles.loaderOverlay}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}

        <Toast />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#D9CED4', alignItems: 'center', justifyContent: 'flex-end', gap: 0, position: 'relative' },
  topSection: { width: '100%', alignItems: 'center', height: height * 0.38, position: 'relative', top: 0 },
  worker: { width: '100%', height: '100%', resizeMode: 'contain' },
  content: { width: '92%', backgroundColor: 'white', borderTopLeftRadius: width * 0.12, borderTopRightRadius: width * 0.12, alignItems: 'center', paddingTop: height * 0.03, paddingBottom: height * 0.06, paddingHorizontal: width * 0.05 },
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
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
});

export default Page1;
