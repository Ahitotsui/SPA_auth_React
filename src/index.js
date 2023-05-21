import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import NavBar from './original_component/NavBar';
import Register from './original_component/Register';
import EmailVerify from './original_component/EmailVerify';
import Login from './original_component/Login';
import Logout from './original_component/Logout';
import ResetPassword from './original_component/ResetPassword';
import ForgotPassword from './original_component/ForgotPassword'; 
import User from './original_component/User'; 
import Home from './original_component/Home'; 


//お試し
import Main from './original_component/Main'; 
import Auth from './original_component/Auth'; 
import IsAuth from './original_component/IsAuth'; 




import reportWebVitals from './reportWebVitals';
import {Router, Route, Switch, Link, Redirect, useHistory} from 'react-router-dom';


import { createBrowserHistory } from 'history';// history.push()使うために必要
const history = createBrowserHistory();



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <Router history={history}>

    <NavBar />

    <Switch>


    <Route path="/email/verify">
      <EmailVerify />
    </Route>

    <Route path="/forgot-password">
      <ForgotPassword />
    </Route>

    <Route path="/api/reset-password">
      <ResetPassword />
    </Route>
      
    <Route path="/home">
      <Home />
    </Route>

      {/* 未承認でもアクセスできるが、ログインしたら表示したくないページ */}
      <IsAuth path="/register" component={Register} />
      <IsAuth path="/login" component={Login} />
      

      <Auth>
        <Switch>

          <Route path="/user">
            <User />
          </Route>

        </Switch>
      </Auth>

      
    </Switch>
    
  </Router>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
