import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import HomePage from "./HomePage";
import HistoryPage from "./HistoryPage";
import ProfileContainer from "./ProfileScreens/ProfileContainer";
import NotificationCard from "../NotificationCard";
import { ServiceAccessProvider } from "./ServiceAccesContext";

const Tab = createBottomTabNavigator();

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.wrapper}>
      {/* Black pill containing all 3 tabs */}
      <View style={styles.tabContainer}>
        {state.routes.slice(0, 3).map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            if (!isFocused) {
              navigation.navigate(route.name);
            }
          };

          let iconName;
          if (route.name === "Home") iconName = "home";
          if (route.name === "History") iconName = "clock";
          if (route.name === "ProfilePage") iconName = "user";

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={[
                styles.tabButton,
                isFocused && styles.activeTab,
                {
                  borderRadius: 28,
                  width: 56,
                  height: 56,
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
            >
              <Feather
                name={iconName}
                size={28}
                color={isFocused ? "black" : "white"}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const Container = () => {
  const route = useRoute();
  const { loginData } = route.params;

  return (
    <ServiceAccessProvider>
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: "tranparent", elevation: 0 }, // fully transparent
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomePage}
          initialParams={{ loginData }}
        />
        <Tab.Screen
          name="History"
          component={HistoryPage}
          initialParams={{ loginData }}
        />
        <Tab.Screen
          name="ProfilePage"
          component={ProfileContainer}
          initialParams={{ loginData }}
        />

        {/* Hidden screen */}
        <Tab.Screen
          name="Notifications"
          component={NotificationCard}
          initialParams={{ loginData }}
          options={{ tabBarButton: () => null }}
        />
      </Tab.Navigator>
    </ServiceAccessProvider>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 40,
    backgroundColor: "transparent", // ✅ transparent wrapper
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "black", // ✅ pill stays black
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tabButton: {
    padding: 0,
    marginHorizontal: 6,
  },
  activeTab: {
    backgroundColor: "white",
  },
});

export default Container;
