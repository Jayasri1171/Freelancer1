import 'dotenv/config';

export default {
  expo: {
    name: 'App',
    slug: 'App',
    version: '1.0.0',
    extra: {
      BASE_URL: process.env.BASE_URL,
    //   API_KEY: process.env.API_KEY,
    },
    splash: {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
  },
  
};
