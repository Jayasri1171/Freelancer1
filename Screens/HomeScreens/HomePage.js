import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRoute } from "@react-navigation/native";

const reviews = [
    {
        name: 'Naveen Sesetti',
        custId: '466453',
        service: 'Pipe Leakage',
        date: '18/08/2025',
        avatar: require('../../assets/Homeman1.jpg'),
    },
    {
        name: 'Mohan Sesetti',
        custId: '466453',
        service: 'Pipe Leakage',
        date: '18/08/2025',
        avatar: require('../../assets/Homeman2.jpg'),
    },
    {
        name: 'Naveen Sesetti',
        custId: '466453',
        service: 'Pipe Leakage',
        date: '18/08/2025',
        avatar: require('../../assets/Homeman1.jpg'),
    },
    {
        name: 'Mohan Sesetti',
        custId: '466453',
        service: 'Pipe Leakage',
        date: '18/08/2025',
        avatar: require('../../assets/Homeman2.jpg'),
    },
    {
        name: 'Naveen Sesetti',
        custId: '466453',
        service: 'Pipe Leakage',
        date: '18/08/2025',
        avatar: require('../../assets/Homeman1.jpg'),
    },
    {
        name: 'Mohan Sesetti',
        custId: '466453',
        service: 'Pipe Leakage',
        date: '18/08/2025',
        avatar: require('../../assets/Homeman2.jpg'),
    },
];

const HomePage = () => {
     const route = useRoute();
  const { loginData } = route.params;
    return (
        <ScrollView>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.headerRow}>
                    <Text style={styles.headerText}>
                        Welcome, <Text style={styles.headerBold}>{loginData.data.name || "User"}!</Text>
                    </Text>
                    <MaterialIcons name="notifications-none" size={24} color="#222" />
                </View>
                {/* Lifetime Earnings */}
                <View style={styles.lifetimeRow}>
                    <Text style={styles.lifetimeAmount}>₹ 35,235.89</Text>
                    <Text style={styles.lifetimeLabel}>Lifetime</Text>
                </View>
                {/* Chart */}
                <View style={styles.chartBox}>
                    {/* Replace with chart library if needed */}
                    <View style={styles.chartPlaceholder}>
                        <Text style={styles.chartText}>[Chart]</Text>
                    </View>
                </View>
                {/* Stats Row */}
                <View style={styles.statsRow}>
                    <View style={styles.targetBox}>
                        <Text style={styles.serviceboxheader}>Service Target</Text>
                        <View style={styles.circleOuter}>
                            <View style={styles.circleInner}>
                                <Text style={styles.targetPercent}>60%</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>

                            <View style={{ width: '45%' }}>
                                <Text style={styles.targetSub}>Target : 100</Text>
                                <Text style={styles.targetDesc}>You have to complete 40 services to reach the target</Text>
                            </View>
                            <View style={{ width: '45%' }}>
                                <Text style={styles.targetSub}>Score : 60</Text>
                                <Text style={styles.targetDesc}>You have to complete 40 services to reach the target</Text>

                            </View>
                        </View>
                    </View>

                    <View style={styles.statsCol}>
                        <View style={styles.statsCard}>
                            <Text style={styles.statsTitle}>Total Earnings</Text>
                            <Text style={styles.statsAmount}>₹ 17,235.89</Text>
                            <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, paddingBottom: 4 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}><Text style={styles.statsChange}> +67%</Text><Text style={{ color: 'white', fontSize: 6 }}>Than last month</Text></View>
                            </View>
                        </View>
                        <View style={styles.statsCard}>
                            <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, paddingBottom: 4 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' , justifyContent:'space-between'}}>
                                    <View>
                            <Text style={styles.statsTitle}>Total Works</Text>
                                        <Text style={styles.statsAmount}>102 <Text style={{ color: 'white', fontSize: 8 }}>Till today</Text></Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}><Text style={styles.statsChange}> +67%</Text><Text style={{ color: 'white', fontSize: 6 }}>Than last month</Text></View>
                                    </View>
                                    <View style={{ alignItems: "center", justifyContent: 'center' }}>
                                        <Text style={styles.statsSub}>Last Month</Text>
                                        <Text style={{ color: 'white', fontSize: 20 }} >186</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                {/* Reviews */}
                <Text style={styles.reviewsTitle}>Reviews</Text>
                <View style={styles.reviewsBox}>
                    {reviews.map((r, idx) => (
                        <View key={idx} style={styles.reviewItem}>
                            <Image source={r.avatar} style={styles.reviewAvatar} />
                            <View style={styles.reviewInfo}>
                                <Text style={styles.reviewName}>{r.name}</Text>
                                <Text style={styles.reviewCustId}>CustID : {r.custId}</Text>
                            </View>
                            <View style={styles.reviewService}>
                                <Text style={styles.reviewServiceText}>{r.service}</Text>
                                <Text style={styles.reviewDate}>{r.date}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: '10%',
        alignItems: 'center',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 18,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        paddingBottom: 10,
        width: '90%',
        // marginBottom: 8,
    },
    headerText: {
        fontSize: 20,
        color: '#222',
        fontWeight: '400',
    },
    headerBold: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#222',
    },
    lifetimeRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 8,
        marginTop: 8,
        width: '90%',
        paddingTop: 10,
    },
    lifetimeAmount: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#222',
        marginRight: 8,
    },
    lifetimeLabel: {
        fontSize: 13,
        color: '#888',
        marginBottom: 4,
    },
    chartBox: {
        backgroundColor: '#222',
        borderRadius: 18,
        width: '90%',
        height: 200,
        marginBottom: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chartPlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chartText: {
        color: '#fff',
        fontSize: 18,
    },
    statsRow: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    targetBox: {
        backgroundColor: '#222',
        borderRadius: 18,
        padding: 12,
        width: '48%',
        alignItems: 'center',
    },
    circleOuter: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#F2FF00',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    circleInner: {
        width: 56,
        height: 56,
        borderRadius: 258,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    targetPercent: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    targetLabel: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 2,
    },
    targetSub: {
        color: '#fff',
        fontSize: 12,
        marginBottom: 2,

    },
    serviceboxheader: {
        color: '#fff',
        fontSize: 18,
        width: '100%',
        textAlign: 'left',
        fontWeight: 400,
    },
    targetDesc: {
        color: '#fff',
        fontSize: 7,
        marginTop: 2,
        width: '80%',
        // textAlign: 'center',
    },
    statsCol: {
        width: '50%',
        justifyContent: 'space-between',
    },
    statsCard: {
        backgroundColor: '#111',
        borderRadius: 14,
        marginBottom: 8,
        paddingHorizontal: 18,
        paddingVertical: 20,

    },
    statsTitle: {
        color: '#fff',
        fontSize: 13,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    statsAmount: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    statsSub: {
        color: '#fff',
        fontSize: 11,
        fontWeight: 400, 
    },
    statsChange: {
        color: '#22c55e',
        fontSize: 12,
        marginBottom: 2,
    },
    reviewsTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#222',
        alignSelf: 'flex-start',
        marginLeft: 18,
        marginTop: 8,
        // marginBottom: 6,
    },
    reviewsBox: {
        width: '90%',
        backgroundColor: '#FFF',
        borderRadius: 18,
        padding: 8,
    },
    reviewItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#D7D7D7',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 8,
    },
    reviewAvatar: {
        width: 38,
        height: 38,
        borderRadius: 19,
        marginRight: 10,
        backgroundColor: '#ccc',
    },
    reviewInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    reviewName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#222',
    },
    reviewCustId: {
        fontSize: 12,
        // color: '#888',
    },
    reviewService: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    reviewServiceText: {
        fontSize: 13,
        color: '#222',
        fontWeight: 'bold',
    },
    reviewDate: {
        fontSize: 12,
        // color: '#888',
    },
});

export default HomePage;
