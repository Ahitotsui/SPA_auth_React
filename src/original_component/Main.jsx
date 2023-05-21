//ここで全部のコンポーネントに対して承認で切り替えられないかやってみる


import Login from './Login';
import User from './User';
import Home from './Home';

import {Router, Route, Switch, Link, Redirect, useHistory} from 'react-router-dom';
import axios from 'axios';
import { Cookies, useCookies } from "react-cookie";
import { useState, useEffect, useContext } from "react";

import React, {Component} from 'react';

    
function Main(){
    // const contextType = SampleContext;

    const [auth_token, setCookie, removeCookie] = useCookies(["token","isAuth"]);

    
    const [auth,setAuth] = useState(false);


    // const [is_logined,setIsLogin] = useState(false);

    // localStorage.getItem('auth_status');
    // if(localStorage.getItem('auth_status') == 200){
    //     setIsLogin(true);
    // }else if(localStorage.getItem('auth_status') != 200){
    //     setIsLogin(false);
    // }


    useEffect(()=>{
        // トークンでアクセスしてユーザー名を取得
        axios.get('http://127.0.0.1:8000/api/user',{ headers: { Authorization: "Bearer " + auth_token.token } }).then((response) => { 
            console.log(response);
            alert(response.status);
            // setIsLogin(true);
            
        }).catch((error) => { 
            // alert('NG');
            console.log(error.response.status);
            alert(error.response.status);
            // localStorage.setItem('auth_status',error.response.status);
        });
    },[]);


    return(

        
    
        <Switch>
        
            {auth ?
                <>     
                    <Route path="/user">
                        <User />
                    </Route>
                    {/* <Route path="/home">
                        <Home />
                    </Route> */}
                </>
 
            :
                <>
                    <Redirect to="/login" />
                    <Route path="/login">
                        <Login setAuth={setAuth} />
                    </Route>
                </>
                
            }
        
        </Switch>

    );
}


export default Main;
