import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TermsPage = () => {
    const navigation = useNavigation();
    const handleAgree = () => {
        navigation.navigate({
            name: navigation.getState().routes[navigation.getState().index - 1].name,
            params: { agreed: true },
            merge: true, // Important: merge params with existing ones
        });
    };
    return (
        <View style={styles.container}>
            <View style={styles.whitebox}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>TERMS AND CONDITIONS</Text>
                    <Text style={styles.headerSubtitle}>FOR EMPLOYESS</Text>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <View style={styles.subheadinginscroll}>
                        <Text style={{ fontSize: 12 }}>
                            Effective Date: 7/7/25{"\n"}
                            Company Name: Cube Engineers.
                        </Text></View>
                    <Text style={styles.sectionTitle}>1. Eligibility</Text>
                    <Text style={styles.sectionText}>
                        • This agreement applies to individuals or businesses that have acquired a franchise from our company for selling food products under our brand.
                    </Text>

                    <Text style={styles.sectionTitle}>2. Franchise Operations</Text>
                    <Text style={styles.sectionText}>
                        • You agree to operate your franchise in line with the company’s standards, maintain high-quality food, ensure excellent customer service, and protect the brand’s reputation.
                    </Text>

                    <Text style={styles.sectionTitle}>3.  Use of Systems & Tools</Text>
                    <Text style={styles.sectionText}>
                        • You may use the company’s provided tools, including software, ordering systems, and reporting platforms, to manage your franchise operations effectively and efficiently.
                    </Text>

                    <Text style={styles.sectionTitle}>4. Compliance</Text>
                    <Text style={styles.sectionText}>
                        • You must comply with all applicable laws, licenses, health and safety regulations, and industry standards required to operate a food business in your location.
                    </Text>

                    <Text style={styles.sectionTitle}>5. Payments & Fees</Text>
                    <Text style={styles.sectionText}>
                        • You are responsible for timely payment of franchise fees, royalty charges, and other financial obligations as outlined in the franchise agreement.
                    </Text>

                    <Text style={styles.sectionTitle}>6. Data Handling & Privacy</Text>
                    <Text style={styles.sectionText}>
                        • You agree to handle customer information, payment details, and business data securely and in accordance with applicable privacy laws and company policies.
                    </Text>

                    <Text style={styles.sectionTitle}>7. Brand & Intellectual Property</Text>
                    <Text style={styles.sectionText}>
                        • The brand name, logos, recipes, menus, marketing materials, and other intellectual property belong to the company and must be used only as permitted.
                    </Text>

                    <Text style={styles.sectionTitle}>8. Training & Support</Text>
                    <Text style={styles.sectionText}>
                        • You agree to participate in training programs and use the company’s support services to ensure smooth operations and adherence to business guidelines.
                    </Text>

                    <Text style={styles.sectionTitle}>9. Marketing & Promotion</Text>
                    <Text style={styles.sectionText}>
                        • You shall follow brand-approved marketing strategies and promotional campaigns to grow your franchise while ensuring consistency and integrity.
                    </Text>

                    <Text style={styles.sectionTitle}>10. Termination</Text>
                    <Text style={styles.sectionText}>
                        • Failure to comply with operational standards, misuse of tools or data, or any actions that damage the brand’s image may result in suspension or termination of the franchise agreement.
                    </Text>

                    <Text style={styles.sectionTitle}>11. Indemnity & Liability</Text>
                    <Text style={styles.sectionText}>
                        • You agree to indemnify the company against any losses, claims, or damages resulting from your operations, negligence, or non-compliance with this agreement.
                    </Text>

                    <Text style={styles.sectionTitle}>12. Amendments</Text>
                    <Text style={styles.sectionText}>
                        • The company may update or revise these terms periodically. Continued operation of the franchise after such updates constitutes your acceptance of the new terms.
                    </Text>

                    <Text style={styles.sectionTitle}>13. Agreement</Text>
                    <Text style={styles.sectionText}>
                        • By signing this agreement and operating the franchise, you confirm that you understand and accept these terms and commit to running your business with integrity, transparency, and professionalism.
                    </Text>

                    <TouchableOpacity style={styles.agreeButton} onPress={handleAgree}>
                        <Text style={styles.agreeText}>Agree</Text>
                    </TouchableOpacity>
                    <Text style={styles.footerText}>
                        Already have an <Text style={{ color: '#2859C5', textDecorationLine: 'underline', fontWeight: 'bold' }} onPress={() => navigation.navigate("SignupPage")}>Account?</Text>
                    </Text>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D9CED4',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 10,
    },
    whitebox: {
        flex: 1,
        backgroundColor: 'white',
        width: '92%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 50,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    subheadinginscroll: {
        fontSize: 12,
        // color: '#555',
        marginBottom: 12,
        textAlign: 'center',
        lineHeight: 18,

    },
    header: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 18,
        borderRadius: 16,
        width: 280,
        height: 40,
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        // color: '#2859C5',
        textAlign: 'center',
    },
    headerSubtitle: {
        fontSize: 22,
        color: '#222',
        textAlign: 'center',
        marginTop: -2,
    },
    scrollContent: {
        paddingHorizontal: 18,
        paddingBottom: 20,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#222',
        marginTop: 12,
        marginBottom: 12,
    },
    sectionText: {
        fontSize: 12,
        color: '#333',
        marginBottom: 6,
        lineHeight: 18,
    },
    agreeButton: {
        backgroundColor: '#2859C5',
        borderRadius: 10,
        width: 220,
        paddingVertical: 10,
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 8,
        marginTop: 20,
    },
    agreeText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footerText: {
        fontSize: 13,
        // color: '#888',
        textAlign: 'center',
        marginBottom: 8,
    },
});

export default TermsPage;
