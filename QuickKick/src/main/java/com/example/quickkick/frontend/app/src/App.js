
import './App.css';
import { Route, Routes} from "react-router-dom";
import Navbar from "./components/nav/Navbar";
import Home from "./components/homeComponents/home/Home";
import Footer from "./components/footer/Footer";
import AboutUs from "./components/aboutUs/aboutUs";
import Registration from "./components/registration/Registration";
import Contact from "./components/contact/Contact";
import Gallery from "./components/gallery/Gallery";
function App() {
  return (
    <div className="App">
        <Navbar />
      <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/about-us" element={<AboutUs></AboutUs>}></Route>
          <Route path="/registration" element={<Registration></Registration>}></Route>
          <Route path="/contact" element={<Contact></Contact>}></Route>
          <Route path="/photos" element={<Gallery></Gallery>}></Route>
      </Routes>
        <Footer/>
    </div>
  );
}

export default App;
