import React from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import AdminPage from "scenes/adminPage";
import HomePage from "scenes/homePage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import Dashboard from "scenes/adminPage/Homepage";

import Admin from "scenes/adminPage/Admin";
import Userlists from "scenes/adminPage/Userlist";
import Chat from "scenes/Chat/Chat";

import Report from "components/Report";

import UserreporterList from "scenes/adminPage/Userreporterlist";
//import { StarRateRounded } from "@mui/icons-material";

function App() {
  const mode = useSelector((state) => state.mode);

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.auth.token));
  return (
    <div className="App">
      
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            {/* <Route path="/home" element={<HomePage />} /> */}
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
               <Route path='/admin/dashboard' element={<Dashboard/>}/>
               {/* <Route path='/register' element={<Register/>}/> */}
               <Route path='/admin' element={<Admin/>}/>
               <Route path='/admin/user-list' element={<Userlists/>}/>   
               <Route path='/admin/report-list' element={<UserreporterList/>}/>   
               <Route
              path="/chat"
              element={isAuth ? <Chat/> : <Navigate to="/" />}
             
            />   
            <Route path='/report-post' element={<Report/>}/>     
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
}
export default App;
