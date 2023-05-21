import React, { useState} from 'react';
import axios from 'axios';


function RegisterForm(props){

    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [responseData, setResponse] = useState({
        message: '',
        email: '',
        error_name: '',
        error_email: '',
        error_password: '',
    });

    const [ isLoading, setIsLoading ] = useState(false);


    const handleInput = (e) => {

        //イベントハンドラが実行された後にオブジェクトのプロパティにアクセスする必要がある場合は、e.persist() を呼ぶ必要がある
        e.persist();

        setRegister({...registerInput, [e.target.name]: e.target.value });
    }

    const registerSubmit = (e) => {

        //フォームデータ送信時に画面を再更新しないようにする処理
        e.preventDefault();
        setIsLoading(true);
        

        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
            password_confirmation: registerInput.password_confirmation,
        }


        axios.post('http://127.0.0.1:8000/api/register', data).then(function (response) {
            // 送信成功時の処理
            setIsLoading(false);
            console.log(response.data);
            setResponse({
                message: response.data.message,
                email: response.data.email,
            });

            props.setRegisterCheck({
                status: false,
                email: registerInput.email,
            });
            
        })
        .catch(function (error) {
            // 送信失敗時の処理
            alert('NG');
            console.log('通信に失敗しました');
            setResponse({
                error_name: error.response.data.name,
                error_email: error.response.data.email,
                error_password: error.response.data.password,
            });
                
        });
    }


    return (
        <div className="w-96 ml-auto mr-auto">
            
            <h1 className="w-full border-b-2 text-center text-2xl mt-10 mb-10 font-bold">新規登録</h1>

            <div>
                { isLoading ? '送信中....' : '' }
            </div>     

            <form onSubmit={registerSubmit}>

                <span>名前</span>
                <span className="block text-red-500">{responseData.error_name}</span>
                <input type="text" name="name" value={registerInput.name} onChange={handleInput} className="input_style"/>

                <span>メールアドレス</span>
                <input type="email" name="email" value={registerInput.email}  onChange={handleInput} className="input_style"/>

                <span>パスワード</span>
                <input type="password" name="password" value={registerInput.password}  onChange={handleInput} className="input_style"/>

                <span>パスワード(確認でもう一度入力)</span>
                <input type="password" name="password_confirmation" value={registerInput.password_confirmation}  onChange={handleInput} className="input_style"/>

                <button type="submit" className="block mt-10 bg-gray-800 w-full h-10 text-white ml-auto mr-auto rounded-lg shadow-lg font-medium text-1xl">
                    登録
                </button>

            </form>       
        
        </div>
    );
    
    
}


export default RegisterForm;