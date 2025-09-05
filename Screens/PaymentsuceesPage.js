import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const PaymentsuceesPage = () => {
    return (
        <View style={styles.container}>
            <View style={styles.whiteBox}>
                <View style={styles.iconRow}>
                    <MaterialIcons name="check-circle" size={74} color="#22c55e" />
                </View>
                <View style={styles.successRow}>
                    <Text style={styles.successText}>Your payment successfully completed..</Text>
                </View>
                <Text style={styles.disclaimerTitle}>*Disclaimer</Text>
                <View style={styles.bulletSection}>
                    <View style={styles.listItem}>
                        <View style={styles.bulletDot} />
                        <Text style={styles.bulletText}>Right after payment, we will get your application.</Text>
                    </View>
                    <View style={styles.listItem}>
                        <View style={styles.bulletDot} />
                        <Text style={styles.bulletText}>Then, you will have training sessions for 3 days.</Text>
                    </View>
                    <View style={styles.listItem}>
                        <View style={styles.bulletDot} />
                        <Text style={styles.bulletText}>Based upon your performance you will be granted as a Verified Technician in this app.</Text>
                    </View>
                </View>
                <Text style={styles.processText}>Your Application under process...</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D9CED4',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    whiteBox: {
        backgroundColor: 'white',
        width: '90%',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        alignItems: 'center',
        paddingBottom: 32,
        paddingHorizontal: 18,
        height: '90%',
        paddingTop: 100,
    },
    iconRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 0,
    },
    successRow: {
        width: '100%',
        alignItems: 'flex-start',
        marginBottom: 18,
        marginTop: 2,
        paddingLeft: 8,
    },
    successText: {
        fontSize: 15,
        color: '#222',
        textAlign: 'left',
        fontWeight: 'bold',
    },
    disclaimerTitle: {
        fontSize: 25,
        fontWeight: 400,
        color: '#222',
        marginBottom: 8,
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    bulletSection: {
        width: '100%',
        marginBottom: 30,
        alignSelf: 'flex-start',
        paddingLeft: 18,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    bulletDot: {
        width: 5,
        height: 5,
        borderRadius: 4,
        backgroundColor: '#222',
        marginTop: 6,
        marginRight: 10,
    },
    bulletText: {
        fontSize: 14,
        color: '#222',
        flex: 1,
    },
    processText: {
        fontSize: 16,
        color: '#222',
        textAlign: 'center',
        marginTop: 30,
        fontWeight: 'bold',
    },
});

export default PaymentsuceesPage;
