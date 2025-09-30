import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform, Dimensions , ActivityIndicator} from 'react-native';
import Mobile from '../assets/Mobilehand.png';
import { useNavigation, useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import { useAuth } from './AuthContext';
import Constants from 'expo-constants';

const { width, height } = Dimensions.get('window');
const { BASE_URL } = Constants.expoConfig.extra;
const VERIFY_OTP_API = `${BASE_URL}/api/franchise/verifyOtp`;


const Otpscreen = () => {


      const { login, loginData } = useAuth();
    
    const navigator = useNavigation();
    const [checked, setChecked] = useState(false);
    const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
    const [resendTimer, setResendTimer] = useState(60);
    const inputs = Array(4).fill().map(() => useRef(null));
    const timerRef = useRef();
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (resendTimer > 0) {
            timerRef.current = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
        }
        return () => clearTimeout(timerRef.current);
    }, [resendTimer]);


    const handleChange = (text, idx) => {
        if (/^\d?$/.test(text)) {
            const newOtp = [...otpDigits];
            newOtp[idx] = text;
            setOtpDigits(newOtp);
            if (text && idx < 3) {
                inputs[idx + 1].current.focus();
            }
        }
    };

    const handleKeyPress = (e, idx) => {
        if (e.nativeEvent.key === 'Backspace' && !otpDigits[idx] && idx > 0) {
            inputs[idx - 1].current.focus();
        }
    };

    const handleResend = () => {
        if (resendTimer === 0) {
            // TODO: trigger resend OTP logic here
            setResendTimer(60);
        }
    };


     const handleVerify = async () => {
    if (otpDigits.some(d => d === '')) {
      Toast.show({ type: 'error', text1: 'Invalid OTP', text2: 'Enter all 4 digits' });
      return;
    }

    setSubmitting(true);
    const otp = otpDigits.join('');
    // console.log(otp);
    try {
      const res = await fetch(VERIFY_OTP_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verificationId: loginData.response.data.verificationId, // from login response
    code: otpDigits.join('') }),
      });

      console.log({ verificationId: loginData.response.data.verificationId, // from login response
    code: otpDigits.join('') });
      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || 'OTP verification failed');

      Toast.show({ type: 'success', text1: 'Verified', text2: 'OTP verified successfully!' });
        console.log(res)
      setTimeout(() => {
        navigator.navigate('Container');
      }, 1000);
    } catch (err) {
      Toast.show({ type: 'error', text1: 'Verification failed', text2: err.message });
    } finally {
      setSubmitting(false);
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
                <View style={styles.content}>
                    <Text style={styles.title}>Verify Your Number</Text>
                    <Text style={styles.subtitle}>
                        Enter the OTP sent to your number
                    </Text>
                    <View style={styles.otpSection}>
                        {otpDigits.map((digit, idx) => (
                            <TextInput
                                key={idx}
                                ref={inputs[idx]}
                                style={styles.otpBox}
                                value={digit}
                                onChangeText={text => handleChange(text, idx)}
                                keyboardType="number-pad"
                                maxLength={1}
                                textAlign="center"
                                selectionColor="#2859C5"
                                onKeyPress={e => handleKeyPress(e, idx)}
                            />
                        ))}
                    </View>
                    <Text style={styles.resendText}>
                        Didn't receive the code?{' '}
                        <Text
                            style={[
                                styles.resendLink,
                                { color: resendTimer === 0 ? '#2859C5' : '#aaa' }
                            ]}
                            onPress={handleResend}
                            disabled={resendTimer !== 0}
                        >
                            Resend{resendTimer > 0 ? ` (${resendTimer}s)` : ''}
                        </Text>
                    </Text>
                    <View style={styles.checkboxRow}>
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
                        <Text style={styles.agreeText}>
                            By continuing, you agree to our
                            <Text style={styles.link} onPress={() => navigator.navigate('TermsPage')}> T&amp;C and Privacy policy</Text>
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={[styles.button, submitting && { opacity: 0.5 }]}
                        disabled={submitting}
                        onPress={handleVerify}
                    >
                        {submitting ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Verify</Text>
                        )}
                    </TouchableOpacity>

                    <Text style={styles.accountText}>
                        Don't have an
                        <Text
                            style={styles.accountLink}
                            onPress={() => navigator.navigate('SignupPage')}
                        >
                            {' '}
                            Account?
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
    container: {
        flex: 1,
        backgroundColor: '#D9CED4',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    topSection: {
        width: '100%',
        alignItems: 'center',
        height: '38%',
        // justifyContent: 'flex-end',
    },
    worker: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        // marginTop: 18,
    },
    content: { width: '92%', backgroundColor: 'white', borderTopLeftRadius: width * 0.12, borderTopRightRadius: width * 0.12, alignItems: 'center', paddingTop: height * 0.03, paddingBottom: height * 0.06, paddingHorizontal: width * 0.05 },

    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '2%',
        color: '#111',
        fontFamily: 'Montserrat',
    },
    subtitle: {
        fontSize: 15,
        color: '#888',
        textAlign: 'center',
        marginBottom: '10%',
        fontFamily: 'Montserrat',
    },
    otpSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '3%',
        marginTop: '3%',
    },
    otpBox: {
        width: 44,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#F3F3F3',
        marginHorizontal: 5,
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        fontSize: 22,
        color: '#222',
        fontWeight: 'bold',
        fontFamily: 'Montserrat',
        textAlign: 'center',
    },
    resendText: {
        fontSize: 13,
        color: '#444',
        marginBottom: '18%',
        fontFamily: 'Montserrat',
        textAlign: 'center',
    },
    resendLink: {
        // color: '#2859C5',
        fontWeight: 'bold',
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 3,
        width: '100%',
        paddingLeft: 10,
    },
    customCheckbox: {
        marginRight: 6,
    },
    checkboxBox: {
        width: 24,
        height: 24,
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
    agreeText: {
        fontSize: 12,
        color: '#444',
        fontFamily: 'Montserrat',
        flexShrink: 1,
    },
    link: {
        color: '#2859C5',
        textDecorationLine: 'underline',
    },
    button: {
        backgroundColor: '#2859C5',
        width: '90%',
        paddingVertical: 13,
        borderRadius: 14,
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Montserrat',
    },
    accountText: {
        fontSize: 13,
        color: '#444',
        marginTop: 2,
        fontFamily: 'Montserrat',
    },
    accountLink: {
        color: '#2859C5',
        textDecorationLine: 'underline',
    },
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

export default Otpscreen;