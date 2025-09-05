import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const NotificationCard = () => {
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const screenWidth = Dimensions.get('window').width;

  const toggleExpand = () => {
    if (expanded) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
      }).start(() => setExpanded(false));
    } else {
      setExpanded(true);
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false
      }).start();
    }
  };

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [150,"auto"] // Adjust based on your expanded content height
  });

  const cardStyle = {
    height: heightInterpolate
  };

  return (
    <Animated.View style={[styles.container, cardStyle]}>
      <TouchableOpacity onPress={toggleExpand} activeOpacity={0.9}>
        <View style={styles.mainContent}>
          <View style={styles.left}>
            <View style={styles.avatarContainer}>
              <Image 
                source={require("../assets/Splash.png")} 
                style={styles.avatar}
              />
            </View>
            <Text style={styles.name}>John Doe</Text>
          </View>
          
          <View style={styles.right}>
            <Text style={styles.detail}>
              <FontAwesome name="calendar" size={16} color="#6b7280" /> 
              <Text style={styles.detailText}> 12th Dec, 2023</Text>
            </Text>
            <Text style={styles.detail}>
              <Ionicons name="location-sharp" size={16} color="#6b7280" /> 
              <Text style={styles.detailText}> San Francisco, CA</Text>
            </Text>
            <Text style={styles.detail}>
              <MaterialCommunityIcons name="briefcase" size={16} color="#6b7280" /> 
              <Text style={styles.detailText}> Washing Machine - Drum Replacement</Text>
            </Text>
          </View>
        </View>

        {expanded && (
          <View style={styles.expandedContent}>
            <View style={styles.divider} />
            
            <Text style={styles.sectionTitle}>Additional Information</Text>
            
            <View style={styles.actionButtons}>
              <TouchableOpacity style={[styles.button, styles.acceptButton]}>
                <Ionicons name="checkmark" size={20} color="white" />
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.button, styles.rejectButton]}>
                <Ionicons name="close" size={20} color="white" />
                <Text style={styles.buttonText}>Decline</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        {!expanded && (
          <View style={styles.actionButtons}>
              <TouchableOpacity style={[styles.button, styles.acceptButton]}>
                <Ionicons name="checkmark" size={20} color="white" />
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.button, styles.rejectButton]}>
                <Ionicons name="close" size={20} color="white" />
                <Text style={styles.buttonText}>Decline</Text>
              </TouchableOpacity>
            </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "95%",
    padding: 20,
    alignSelf: "center",
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.5,
    elevation: 5,
    overflow: 'hidden',
  },
  mainContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  left: {
    width: "30%",
    alignItems: "center",
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderColor: "#e5e7eb",
    borderWidth: 2,
    overflow: "hidden",
    marginBottom: 8,
  },
  avatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  name: {
    fontWeight: "600",
    fontSize: 14,
    color: "#1f2937",
    marginBottom: 4,
  },
  status: {
    fontSize: 12,
    color: "#3b82f6",
    textAlign: 'center',
  },
  right: {
    width: "65%",
    justifyContent: "center",
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: "#4b5563",
    marginLeft: 6,
  },
  expandedContent: {
    marginTop: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 12,
  },
  sectionTitle: {
    fontWeight: "600",
    fontSize: 16,
    color: "#1f2937",
    marginBottom: 12,
  },
  extraDetails: {
    marginBottom: 20,
  },
  extraDetailItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  extraDetailText: {
    fontSize: 14,
    color: "#4b5563",
    marginLeft: 8,
    flex: 1,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "45%",
  },
  acceptButton: {
    backgroundColor: "#10b981",
  },
  rejectButton: {
    backgroundColor: "#ef4444",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    marginLeft: 6,
  },
  collapsedActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  smallButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  smallAcceptButton: {
    backgroundColor: "#10b981",
  },
  smallRejectButton: {
    backgroundColor: "#ef4444",
  },
});

export default NotificationCard;