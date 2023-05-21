import axios from 'axios';
import { Cookies, useCookies } from "react-cookie";
import { useState, useEffect, useContext } from "react";

import {Link, useHistory} from 'react-router-dom';



function User(){
    document.title = 'Myページ';

    //ページ遷移で使う
    const history = useHistory();
    const status = localStorage.getItem('status');


    const [auth_token, setCookie, removeCookie] = useCookies(["token"]);
    const API_TOKEN = auth_token.token 

    const [user ,setUser] = useState({
        name:'',
        email:'',
        password:'',
        created_at:'',
    });

    //useEffectでレンダー後にAPIのレスポンスを取得。レンダー時に1度だけ、外部APIを呼び出したいので、第二引数に [] を渡す。
    //ちなみに、useEffectを使わなかったら、何度もapiにリクエストしてコード:429(too many request)のエラーが出たのでその対策。
    useEffect(()=>{
        // トークンでアクセスしてユーザー名を取得
        axios.get('http://127.0.0.1:8000/api/user',{ headers: { Authorization: "Bearer " + API_TOKEN } }).then((response) => { 
            console.log(response);
            
            setUser({
                name:response.data.name,
                email:response.data.email,
                password:response.data.password,
                created_at:response.data.created_at,                
            });

        }).catch((error) => { 
            // alert('NG');
            console.log(error.response.status);
            localStorage.setItem('auth_status',error.response.status);
            localStorage.setItem('isAuth',false);
        });
    },[]);





    return(
        <div className="w-96 ml-auto mr-auto">
            <h1 className="w-full border-b-2 text-center text-2xl mt-10 mb-10">マイページ</h1>
        <p>{localStorage.getItem('auth_status')}</p>
            <ul>
                <li>{user.name}</li>
                <li>{user.email}</li>
                <li>{user.password}</li>
                <li>{user.created_at}</li>
            </ul>
        </div>

    );
}


export default User;