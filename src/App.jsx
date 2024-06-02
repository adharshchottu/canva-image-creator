import './index.css'
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
import { Route, Routes } from "react-router-dom";
import Glossary from './pages/Glossary';
import ObservanceDays from './pages/ObservanceDays';
import Typinks from './pages/Typinks';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {

  return (
    <>
      <Routes>
        <Route exact path="/" Component={Glossary} />
        <Route exact path="/observance-days" Component={ObservanceDays} />
        <Route exact path="/typinks" Component={Typinks} />
      </Routes>
    </>
  )
}

export default App
