// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useRoute } from "@react-navigation/native";

// Import Pages
import ProfilePage from "./ProfilePage";
import ProfileEarning from "./ProfileEarning";
import ProfileLocation from "./ProfileLocation";
import ProfileLanguage from "./ProfileLanguage";
import ProfileLevel from "./ProfileLevel";
import ProfileLogout from "./ProfileLogout";

const Stack = createNativeStackNavigator();

export default function ProfileContainer() {
   const route = useRoute();
  const { loginData } = route.params;
  return (
    // <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Profile"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Profile" component={ProfilePage} options={{ headerShown: false }} initialParams={{ loginData }} />
        <Stack.Screen name="Earning" component={ProfileEarning} initialParams={{ loginData }} />
        <Stack.Screen name="Location" component={ProfileLocation} initialParams={{ loginData }} />
        <Stack.Screen name="Language" component={ProfileLanguage} initialParams={{ loginData }} />
        <Stack.Screen name="Level" component={ProfileLevel} initialParams={{ loginData }} />
        <Stack.Screen name="Logout" component={ProfileLogout} initialParams={{ loginData }} />
      </Stack.Navigator>
    // </NavigationContainer>
  );
}
