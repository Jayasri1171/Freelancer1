import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import Splash from '../assets/Splash.png';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from './AuthContext';

const { width, height } = Dimensions.get('window');

const Splashscreen = () => {
  const navigator = useNavigation();
  const { loginData, loading } = useContext(AuthContext);
   const handleGrowPress = () => {
    if (loginData) {
      navigator.navigate('Container'); // no need to pass loginData
    } else {
      navigator.navigate('Page1');
    }
  };


  return (
    <View style={styles.container}>
      <Image source={Splash} style={styles.worker} />
      <View style={styles.content}>
        <Text style={styles.title}>Grow Your Franchise With Us</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Fuel your franchise growth by connecting with customers, managing operations, and
            boosting your food business—all in one powerful, easy-to-use platform.
          </Text>
        </View>

        {!loading && (
          <TouchableOpacity style={styles.button} onPress={handleGrowPress}>
            <Text style={styles.buttonText}>Grow with us</Text>
          </TouchableOpacity>
        )}

      </View>

      {/* Full screen loader */}
      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color="#2859C5" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: '#D9CED4' },
  worker: { width: '120%', position: 'absolute', top: '7%', resizeMode: 'contain' },
  content: { width: '90%', height: height * 0.4, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', paddingHorizontal: width * 0.08, paddingVertical: height * 0.03, borderTopLeftRadius: 30, borderTopRightRadius: 30 },
  title: { fontSize: width * 0.055, fontWeight: '600', textAlign: 'center', marginBottom: 10 },
  descriptionContainer: { marginBottom: height * 0.03, padding: width * 0.02 },
  description: { fontSize: width * 0.04, textAlign: 'center', color: '#555' },
  button: { backgroundColor: '#2859C5', paddingHorizontal: width * 0.18, paddingVertical: height * 0.02, borderRadius: 15 },
  buttonText: { color: 'white', fontSize: width * 0.045, fontWeight: 'bold' },
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
});

export default Splashscreen;
