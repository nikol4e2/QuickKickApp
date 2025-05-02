import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AdminPanel from "./AdminPanel/AdminPanel";
import StopWatch from "./AdminPanel/playingMatch/stopwatchPanel/StopWatch";
import ControlPanel from "./AdminPanel/playingMatch/stopwatchPanel/ControlPanel";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

      <Router>
          <Routes>
              {/* Главната апликација */}
              <Route path="/*" element={<App />} />

              {/* Рути за Админ панелот */}
              <Route path="/admin/*" element={<AdminPanel />} />

              <Route path={"/stopwatch/:id"} element={<StopWatch></StopWatch>}></Route>
              <Route path={"/controls/:id"} element={<ControlPanel></ControlPanel>}></Route>
          </Routes>

      </Router>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

