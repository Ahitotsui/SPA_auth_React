import '../original_css/Login.css';
import React, { useState} from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import { useCookies } from "react-cookie";

// import {AuthProvider,AuthConsumer} from '../original_context/auth';
// import {AuthProvider,AuthConsumer,setIsAuth} from '../original_context/is_logined';


function Login() {
    //ページ遷移で使う
    const history = useHistory();

    // if(localStorage.getItem('auth_status') == 200){
    //     history.push('/user');
    // }


    // フォーム入力の値の変数を定義
    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
    });


    // トークンを保存するクッキーを定義
    const [auth_token, setCookie, removeCookie] = useCookies(["token"]);


    // フォーム入力された値をsetLogin関数で更新
    const handleInput = (e) => {

        //イベントハンドラが実行された後にオブジェクトのプロパティにアクセスする必要がある場合は、e.persist() を呼ぶ必要がある
        e.persist();

        setLogin({...loginInput, [e.target.name]: e.target.value });
    }

    // フォームのボタンがsubmitされた時に、ログインの処理をする
    const LoginSubmit = (e) =>{

        //フォームデータ送信時に画面を再更新しないようにする処理
        e.preventDefault();

        // axiosで送るデータを定義。ここにフォームで入力された値(email,password)が入る。
        const data = {
            email: loginInput.email,
            password: loginInput.password,
        }

        // axiosでログインAPIにemail,passwordをHTTP通信で送る
        axios.post('http://127.0.0.1:8000/api/login', data).then(function (response) {

            // --------送信成功時の処理-------- //
            alert('ログイン成功');

            //トークンをクッキーに保存
            setCookie("token",response.data.access_token);

            // props.setAuth(true);

            //ユーザ名をローカルストレージに保存
            localStorage.setItem('user_name',response.data.user_name);

            //ステータスコードをローカルストレージに保存
            // localStorage.setItem('status',response.status);
            localStorage.setItem('auth_status',response.status);

            //ログイン後、マイページに移動
            // history.push('/user');
            window.location.href = '/user';
            
        })
        .catch(function (error) {
        
            // --------送信失敗時の処理-------- //
            alert(error.response.data.error);
            console.log(error);

        });

    }


    return (
        <div className="w-96 ml-auto mr-auto">
            <h1 className="w-full border-b-2 text-center text-2xl mt-10 mb-10">ログイン</h1>

            <form onSubmit={LoginSubmit}>
                <div>
                    <p>メールアドレス</p>
                    <input type="email" name="email" 
                        value={loginInput.email}  
                        onChange={handleInput} 
                        className="block w-full h-10 border border-gray-600 rounded"
                        placeholder="メールアドレス"
                    />
                </div>
                <div className="mt-5">
                    <p>パスワード</p>
                    <input type="password" name="password" 
                        value={loginInput.password}  
                        onChange={handleInput}
                        className="w-full h-10 border border-gray-600 rounded"
                        placeholder="パスワード"
                    />
                </div>
                <button type="submit" className="block mt-10 bg-gray-800 w-full h-10 text-white ml-auto mr-auto rounded-lg shadow-lg font-medium text-1xl">ログイン</button>
            </form>

            <Link to="/forgot-password" className="">
                <span className="block w-full text-cyan-500 mt-10">パスワードを忘れた</span>
            </Link>

        </div>
    );
    
}

export default Login;
