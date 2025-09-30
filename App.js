import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Splashscreen from './Screens/Splashscreen';
import Page1 from './Screens/Pagee1';
import Otpscreen from './Screens/Otpscreen';
import ChoosePlan from './Screens/ChoosePlan';
import TermsPage from './Screens/TermsPage';
import SignupPage from './Screens/SignupPage';
import PaymentsuceesPage from './Screens/PaymentsuceesPage';
import Container from './Screens/HomeScreens/Container';
import HomePage from './Screens/HomeScreens/HomePage';
import NotificationCard from './Screens/NotificationCard';
import Mainrouting from './Screens/Mainrouting';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { AuthProvider } from './Screens/AuthContext'; 


export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
         <AuthProvider>  
          <Mainrouting />
        </AuthProvider>
      </SafeAreaView>
      <Toast />
    </SafeAreaProvider>

    //  <Splashscreen />
    // <Page1 />
    // <Otpscreen />
    // <ChoosePlan />
    // <TermsPage />
    // <SignupPage />
    // <PaymentsuceesPage />
    // <Container />
    // <NotificationCard />
    // <HomePage />

  );
}

const styles = StyleSheet.create({
});
