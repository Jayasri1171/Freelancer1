import 'dotenv/config';

export default {
  expo: {
    name: 'Ever Green Dairy',
    slug: 'Ever-Green-Dairy',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/Evergreenlogo.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    splash: {
      image: './assets/Evergreenlogo.png',
      resizeMode: 'cover',
      backgroundColor: '#000000'
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/Evergreenlogo.png',
        backgroundColor: '#ffffff'
      },
      edgeToEdgeEnabled: true,
       package: "com.evergreendiary.app",
      versionCode: 1
    },
    web: {
      favicon: './assets/favicon.png'
    },
    extra: {
      BASE_URL: process.env.BASE_URL,
      eas: {
        projectId: "0b5cf1a7-1fd7-4f0e-9a17-8f5dfc9c6f11"
      }
    }
  }
};
