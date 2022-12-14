import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import CreateSurvey from './screens/CreateSurvey';
import UserPage from './screens/UserPage';
import CreateSurveyWithLogin from './screens/CreateSurveyWithLogin';
import FillSurvey from './screens/FillSurvey';
import Home from './screens/Home';
import UserInfo from './screens/UserInfo';
import Map from './screens/Map';
import Profile from './screens/Profile';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="/home" element={<Home/>} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/createSurvey' element={<CreateSurvey/>}/>
      <Route path='/userPage' element={<UserPage/>}/>
      <Route path='/createSurveyWithLogin' element={<CreateSurveyWithLogin/>}/>
      <Route path='/fillSurvey' element={<FillSurvey/>}/>
      <Route path='/userInfo' element={<UserInfo/>}/>
      <Route path='/Map' element={<Map/>}/>
      <Route path='/Profile' element={<Profile/>}/>


    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
