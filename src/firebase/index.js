// firebase initializer

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAFyFDz9BEp4ByMG3s9DIJZ5eHsvrEsH0o",
  authDomain: "bayitabroad.com",
  projectId: "bayitabroad-jkak",
  storageBucket: "bayitabroad-jkak.appspot.com",
  messagingSenderId: "1047741522845",
  appId: "1:1047741522845:web:ab1e73d40467e2a398c574",
  measurementId: "G-70SKMMYSNZ"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
