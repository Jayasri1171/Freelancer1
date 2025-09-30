// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import Pages
import ProfilePage from "./ProfilePage";
import ProfileEarning from "./ProfileEarning";
import ProfileLocation from "./ProfileLocation";
import ProfileLanguage from "./ProfileLanguage";
import ProfileLevel from "./ProfileLevel";
import ProfileLogout from "./ProfileLogout";

const Stack = createNativeStackNavigator();

export default function ProfileContainer() {
  return (
    // <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Profile"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Profile" component={ProfilePage} options={{ headerShown: false }} />
        <Stack.Screen name="Earning" component={ProfileEarning}  />
        <Stack.Screen name="Location" component={ProfileLocation}  />
        <Stack.Screen name="Language" component={ProfileLanguage}  />
        <Stack.Screen name="Level" component={ProfileLevel} />
        <Stack.Screen name="Logout" component={ProfileLogout} />
      </Stack.Navigator>
    // </NavigationContainer>
  );
}
