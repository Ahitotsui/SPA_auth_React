import React, { useState} from 'react';
import axios from 'axios';
// import ForgotPassword from './ForgotPassword';

function ForgotPassword(){
    const [email, setEmail] = useState();

    const handleInput = (e) => {

        //イベントハンドラが実行された後にオブジェクトのプロパティにアクセスする必要がある場合は、e.persist() を呼ぶ必要がある
        e.persist();

        setEmail(e.target.value);
    }


    const ResetSubmit = (e) =>{
        //フォームデータ送信時に画面を再更新しないようにする処理
        e.preventDefault();

        const data = {
            email: email,
        }
      
        axios.post('http://127.0.0.1:8000/api/forgot-password', data).then(function (response) {
            // 送信成功時の処理
            alert('メール送信成功');

        })
        .catch(function (error) {
            // 送信失敗時の処理
            alert('NG');
            console.log('通信に失敗しました');
        });

    }

    return (
        <div className="w-96 ml-auto mr-auto">

            <h1 className="w-full border-b-2 text-center text-2xl mt-10 mb-10">パスワードリセット</h1>

            <form onSubmit={ResetSubmit}>
                <div>
                    <p>メールアドレス</p>
                    <input type="email" name="email" value={email}  
                        onChange={handleInput} 
                        className="block w-full h-10 border border-gray-600 rounded pl-2"
                    />
                </div>
                <button 
                    type="submit" 
                    className="block mt-10 bg-gray-800 w-full h-10 text-white ml-auto mr-auto rounded-lg shadow-lg font-medium text-1xl">
                    パスワードリセット申請メールを送る
                </button>
            </form>
        </div>
    );

}



export default ForgotPassword;