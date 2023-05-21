// import '../original_css/Login.css';
import {BrowserRouter, Route, Switch, Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import { useCookies } from "react-cookie";
import React, { useState} from 'react';


function NavBar() {

    //ページ遷移で使う
    const history = useHistory();

    const [auth_token, setCookie, removeCookie] = useCookies(["token"]);
    const isAuth = localStorage.getItem('isAuth');

    // const [loginded ,setLogin] = useState(true);

    const logout = () => {

        // HTTPボディを書かないと、ログアウト処理を要求した際にUnauthorize(未承認)のエラーになる
        // POST通信の場合は、受け渡されるパラメータの内容が、ここに記述されます。
        const bodyParameters = {
            key: "value"
        };


        // トークンでアクセスしてユーザー名を取得
        axios.post('http://127.0.0.1:8000/api/logout',bodyParameters, { headers: { Authorization: "Bearer " + auth_token.token} }).then((response) => { 
            alert(response.data.message);
            console.log(response);

            // トークン削除
            removeCookie("token");

            // ユーザーネーム削除
            localStorage.removeItem('user_name');
            localStorage.setItem('isAuth',false);

            localStorage.setItem('auth_status',401);


            //ログイン後、マイページに移動
            history.push('/login');

            //これもいらんかも
            // <AuthProvider>
            //     <AuthConsumer>
            //         {(logout) => logout()}
            //     </AuthConsumer>
            // </AuthProvider>


        }).catch((error) => { 
            alert('ログアウトNG');        
        });


    }


    return (
        <header className="flex w-full h-14 bg-gray-800">

            <h1 className="text-4xl text-white w-3/5 font-light">
                <Link to="/home" className="block  w-full">
                    <span className="text-white">Lara×Rea×JWT SPA</span>
                </Link>
                <br/>トークン:{auth_token.token}
            </h1>


            <div className="flex w-2/5">
            {localStorage.getItem('auth_status') == 200 ?
                //trueのとき

                <>
                    
                    <p className="block  w-full text-center text-white">{localStorage.getItem("user_name")}</p>
                    <Link to="/user" className="block  w-full text-center">
                        <span className="text-white">マイページ</span>
                    </Link>
                    <button className="block w-full text-center text-white" onClick={logout}>ログアウト</button>
                </>
                :
                <>
                    
                    <Link to="/register" className="block  w-full text-center">
                        <span className="text-white">登録</span>
                    </Link>
                    <Link to="/login" className="block  w-full text-center">
                        <span className="text-white">ログイン</span>
                    </Link>
                </>

            }
            
            </div>
        </header>
    );
}

export default NavBar;
