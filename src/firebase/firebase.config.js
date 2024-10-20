// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCu4NXP9FPi5h7Z1qHH50vqmgG5wM4sbM",
  authDomain: "mernstack-car-shop-client.firebaseapp.com",
  projectId: "mernstack-car-shop-client",
  storageBucket: "mernstack-car-shop-client.appspot.com",
  messagingSenderId: "477872168322",
  appId: "1:477872168322:web:fdee0ba1ec3aecfbedc39b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
