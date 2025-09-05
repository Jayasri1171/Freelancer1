import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import HomePage from "./HomePage";
import ServicePage from "./ServicePage";
import HistoryPage from "./HistoryPage";
import ProfileContainer from "./ProfileScreens/ProfileContainer";
// import ProfilePage from "./ProfileScreens/ProfilePage";

const Tab = createBottomTabNavigator();

function CustomTabBar({ state, descriptors, navigation }) {
    
  return (
    <View style={styles.wrapper}>
      {/* Main pill with 3 icons */}
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
          if (route.name === "Service" || route.name === "Services") iconName = "briefcase";
          if (route.name === "History") iconName = "clock";

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={[
                styles.tabButton,
                isFocused && styles.activeTab,
                { borderRadius: 28, width: 56, height: 56, alignItems: 'center', justifyContent: 'center' }
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

      {/* Separate Profile Circle */}
      <View>
        {state.routes.slice(3, 4).map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index + 3;

          const onPress = () => {
            if (!isFocused) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={[
                styles.profileCircle,
                isFocused && { backgroundColor: "#838383" }, // focused color is grey
                { borderRadius: 28, width: 56, height: 56, alignItems: 'center', justifyContent: 'center' }
              ]}
            >
              <Feather
                name="user"
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

export default function App() {
   const route = useRoute();
  const { loginData } = route.params;
  return (
    // <NavigationContainer>
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{ headerShown: false ,
           tabBarStyle: { backgroundColor: "transparent" },
        }}
      >
        <Tab.Screen name="Home" component={HomePage} initialParams={{ loginData }} />
        <Tab.Screen name="Services" component={ServicePage} initialParams={{ loginData }} />
        <Tab.Screen name="History" component={HistoryPage} initialParams={{ loginData }} />
        <Tab.Screen name="ProfilePage" component={ProfileContainer} initialParams={{ loginData }} />
      </Tab.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 40,
    backgroundColor: "transparent", 
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    marginRight: 20,
  },
  tabButton: {
    padding: 0,
    marginHorizontal: 6,
  },
  activeTab: {
    backgroundColor: "white",
  },
  profileCircle: {
    backgroundColor: "black",
    padding: 0,
    marginLeft: 0,
  },
});
