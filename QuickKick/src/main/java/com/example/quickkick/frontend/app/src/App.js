
import './App.css';
import { Route, Routes} from "react-router-dom";
import Navbar from "./components/nav/Navbar";
import Home from "./components/home/Home";

function App() {
  return (
    <div className="App">
        <Navbar />
      <Routes>
          <Route path="/" element={<Home></Home>}></Route>
      </Routes>
    </div>
  );
}

export default App;
