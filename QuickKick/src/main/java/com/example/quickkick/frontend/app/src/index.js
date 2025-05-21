import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AdminPanel from "./AdminPanel/AdminPanel";
import StopWatch from "./AdminPanel/playingMatch/stopwatchPanel/StopWatch";
import ControlPanel from "./AdminPanel/playingMatch/stopwatchPanel/ControlPanel";
import {AuthProvider} from "./AdminPanel/Auth/AuthContext";
import ProtectedRoute from "./AdminPanel/Auth/ProtectedRoute";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
      <Router>
          <Routes>
              {/* Главната апликација */}
              <Route path="/*" element={<App />} />

              {/* Рути за Админ панелот */}
              <Route path="/admin/*" element={<AdminPanel />} />

              <Route path={"/stopwatch/:id"} element={<ProtectedRoute><StopWatch></StopWatch></ProtectedRoute>}></Route>
              <Route path={"/controls/:id"} element={<ControlPanel></ControlPanel>}></Route>
          </Routes>

      </Router>
        </AuthProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

