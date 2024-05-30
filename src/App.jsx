import Navbar from './components/Navbar'
import './index.css'
import Canvas from './components/Canvas'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyDjxYqLFIFOSz7-FbsQPBoPhMch67vE5s0",
  authDomain: "canva-image-creator.firebaseapp.com",
  projectId: "canva-image-creator",
  storageBucket: "canva-image-creator.appspot.com",
  messagingSenderId: "291280736870",
  appId: "1:291280736870:web:2c1d82869503916a0993a7",
  measurementId: "G-4C4EXVFKWS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {

  return (
    <>
    <Navbar page="glossary"/>
    <Canvas />
    </>
  )
}

export default App
