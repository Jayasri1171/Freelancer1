import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, TouchableOpacity } from "react-native";

import Splashscreen from "./Splashscreen";
import Otpscreen from "./Otpscreen";
import Page1 from "./Pagee1";
import ChoosePlan from "./ChoosePlan";
import TermsPage from "./TermsPage";
import SignupPage from "./SignupPage";  
import PaymentsuceesPage from "./PaymentsuceesPage";
import Container from "./HomeScreens/Container";

const Stack = createStackNavigator();


const Mainrouting = () => {
  return (
    <NavigationContainer>   
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splashscreen" component={Splashscreen} />
          <Stack.Screen name="Page1" component={Page1} />   
            <Stack.Screen name="Otpscreen" component={Otpscreen} />
            <Stack.Screen name="ChoosePlan" component={ChoosePlan} />
            <Stack.Screen name="TermsPage" component={TermsPage} />
            <Stack.Screen name="SignupPage" component={SignupPage} />
            <Stack.Screen name="PaymentsuceesPage" component={PaymentsuceesPage} />
            <Stack.Screen name="Container" component={Container} />
        </Stack.Navigator>     
    </NavigationContainer>
  );
}   

export default Mainrouting;