import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, Dimensions } from 'react-native';
import Splash from '../assets/Splash.png';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Splashscreen = () => {
    navigator = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.overlay}>
                <View style={styles.growenlargetext}>
                    {/* <Text style={styles.growText}>GROW</Text> */}
                </View>
                <Image source={Splash} style={styles.worker} />
                <View style={styles.content}>
                    <Text style={styles.title}>Grow Your Franchise With Us</Text>

                    <View style={styles.descriptionContainer}>
                        <Text style={styles.description}>
                            {/* Start building your career with every task you complete. */}
                            Fuel your franchise growth by connecting with customers, managing operations, and boosting your food business—all in one powerful, easy-to-use platform.
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={() => navigator.navigate("Page1")}>
                        <Text style={styles.buttonText}>Grow with us</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D9CED4',
    },
    overlay: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#D9CED4',
    },
    growenlargetext: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'red'
    },
    growText: {

        textAlign: 'center',
        fontWeight: 'bold',
        color: '#F3EAF2',
        letterSpacing: 2,
    },
    worker: {
        width: '120%',
        position: 'absolute',
        top: '7%',
        resizeMode: 'contain',
    },
    content: {
        width: '90%',
        height: height * 0.4,        // responsive height
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: width * 0.08,
        paddingVertical: height * 0.03,
        borderTopLeftRadius: 30,     // keep rounded corners
        borderTopRightRadius: 30,
    },
    title: {
        fontSize: width * 0.055,     // scales with screen size
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 10,
    },
    descriptionContainer: {
        marginBottom: height * 0.03,
        padding:width*0.02,
    },
    description: {
        fontSize: width * 0.04,
        textAlign: 'center',
        color: '#555',
        // marginBottom: 5,
    },
    button: {
        backgroundColor: '#2859C5',
        paddingHorizontal: width * 0.18, // scales button size
        paddingVertical: height * 0.02,
        borderRadius: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: width * 0.045,
        fontWeight: 'bold',
    },
});

export default Splashscreen;