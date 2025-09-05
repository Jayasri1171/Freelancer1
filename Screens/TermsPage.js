import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TermsPage = () => {
    const navigation = useNavigation();
    const handleAgree = () => {
    navigation.goBack(); // Go back to Page1
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
                        <Text style={{ fontSize: 12 }}>Service Roles: Plumber, Cleaner, Electrician, Technician{"\n"}
                            Effective Date: 7/7/25{"\n"}
                            Company Name: Cube Engineers.
                        </Text></View>
                    <Text style={styles.sectionTitle}>1. Employment Scope</Text>
                    <Text style={styles.sectionText}>
                        • The employee agrees to work in one or more of the following roles: Plumber, Cleaner, Electrician, or Technician to provide services at the client’s home as assigned by the company.
                    </Text>

                    <Text style={styles.sectionTitle}>2. Working Hours & Scheduling</Text>
                    <Text style={styles.sectionText}>
                        • Work will be assigned based on customer bookings and availability.
                        {'\n'}• Employees are expected to respond to assignments promptly and arrive at the customer’s location within the specified time (generally within 30–60 minutes unless otherwise informed).
                        {'\n'}• Work hours may vary depending on demand.
                    </Text>

                    <Text style={styles.sectionTitle}>3. Duties and Responsibilities</Text>
                    <Text style={styles.sectionText}>
                        • Perform assigned tasks (plumbing, cleaning, electrical, or technical) efficiently and professionally.
                        {'\n'}• Respect customer property and privacy.
                        {'\n'}• Report job completion and any issues encountered to the supervisor or platform immediately.
                        {'\n'}• Carry proper identification and wear the company uniform if provided.
                    </Text>

                    <Text style={styles.sectionTitle}>4. Code of Conduct</Text>
                    <Text style={styles.sectionText}>
                        • Employees must behave respectfully and professionally at all times.
                        {'\n'}• Use of abusive language, harassment, or any form of misconduct will lead to immediate termination.
                        {'\n'}• No personal favors or services should be accepted or performed outside the assigned task.
                    </Text>

                    <Text style={styles.sectionTitle}>5. Payment and Compensation</Text>
                    <Text style={styles.sectionText}>
                        • Payment will be made on a weekly/monthly basis or per job completed, as per the agreement.
                        {'\n'}• Invoices or job reports must be submitted as required for timely payment.
                        {'\n'}• No additional charges should be taken from the customer unless approved by the company.
                    </Text>

                    <Text style={styles.sectionTitle}>6. Tools and Equipment</Text>
                    <Text style={styles.sectionText}>
                        • Employees must maintain and use tools responsibly.
                        {'\n'}• In case tools are provided by the company, any loss or damage due to negligence will be deducted from the salary.
                    </Text>

                    <Text style={styles.sectionTitle}>7. Customer Confidentiality</Text>
                    <Text style={styles.sectionText}>
                        • Employees must not disclose or misuse any personal or property-related information obtained during the service.
                        {'\n'}• Any breach of confidentiality will lead to strict action.
                    </Text>

                    <Text style={styles.sectionTitle}>8. Safety and Hygiene</Text>
                    <Text style={styles.sectionText}>
                        • Employees are expected to follow proper safety protocols.
                        {'\n'}• Cleaners must use approved cleaning agents and maintain hygiene standards.
                        {'\n'}• Electricians and technicians must use personal protective equipment (PPE) wherever applicable.
                    </Text>

                    <Text style={styles.sectionTitle}>9. Termination of Employment</Text>
                    <Text style={styles.sectionText}>
                        • Either party can terminate employment with prior notice (minimum 7 days).
                        {'\n'}• Immediate termination can occur due to misconduct, negligence, breach of terms, or poor performance.
                    </Text>

                    <Text style={styles.sectionTitle}>10. Liability</Text>
                    <Text style={styles.sectionText}>
                        • The company is not responsible for any injury caused by negligence or non-adherence to safety protocols.
                        {'\n'}• Any damage caused to the customer’s property due to employee fault may lead to compensation recovery.
                    </Text>

                    <TouchableOpacity style={styles.agreeButton} onPress={handleAgree}>
                        <Text style={styles.agreeText}>Agree</Text>
                    </TouchableOpacity>
                    <Text style={styles.footerText}>
                        Already have an <Text style={{ color: '#2859C5', textDecorationLine: 'underline', fontWeight: 'bold' }}>Account?</Text>
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
