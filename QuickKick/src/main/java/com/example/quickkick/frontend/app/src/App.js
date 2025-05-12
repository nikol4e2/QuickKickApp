
import './App.css';
import { Route, Routes} from "react-router-dom";
import Navbar from "./components/nav/Navbar";
import Home from "./components/homeComponents/home/Home";
import Footer from "./components/footer/Footer";
import AboutUs from "./components/aboutUs/aboutUs";
import Registration from "./components/registration/Registration";
import Contact from "./components/contact/Contact";
import Gallery from "./components/gallery/Gallery";
import TeamsSection from "./components/teams/teamsSection/TeamsSection";
import Results from "./components/results/results";
import AdminPanel from "./AdminPanel/AdminPanel";
import Schedule from "./components/schedule/Schedule";
import TeamsInfo from "./components/teams/teamsInfo/TeamsInfo";
import ListLiveMatch from "./components/LIVE/ListLiveMatch/ListLiveMatch";
import LiveMatchStatistics from "./components/LIVE/LiveMatchStatistics/LiveMatchStatistics";
import Login from "./AdminPanel/Auth/Login";
import React from "react";
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
          <Route path="/teams" element={<TeamsSection></TeamsSection>}></Route>
          <Route path="/results" element={<Results></Results>}></Route>
          <Route path="/schedule" element={<Schedule></Schedule>}></Route>
          <Route path="/teams/:id" element={<TeamsInfo></TeamsInfo>}></Route>
          <Route path="/live" element={<ListLiveMatch></ListLiveMatch>}></Route>
          <Route path="/live/:id" element={<LiveMatchStatistics />}></Route>


      </Routes>
        <Footer/>
    </div>
  );
}

export default App;
