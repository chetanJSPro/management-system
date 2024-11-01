// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAU7D52G7SC7FzTrorbyEptv49rnqidH2A",
    authDomain: "buddyapp-756a9.firebaseapp.com",
    databaseURL: "https://buddyapp-756a9-default-rtdb.firebaseio.com",
    projectId: "buddyapp-756a9",
    storageBucket: "buddyapp-756a9.firebasestorage.app",
    messagingSenderId: "372852611713",
    appId: "1:372852611713:web:50c24ce526b0037bb80b80"
};

const fireConfig = initializeApp(firebaseConfig);
export default fireConfig;