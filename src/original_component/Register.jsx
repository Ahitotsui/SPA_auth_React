import '../original_css/Register.css';

import React, { useState, useEffect} from 'react';
import EmailVerify from './EmailVerify';
import RegisterForm from './RegisterForm';


import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

function Register(){

    // 初期状態(status=true)の場合、登録情報の入力画面コンポーネントを表示する
    const [ registerCheck, setRegisterCheck ] = useState({
        status: true,
        email: '',
    });


    return (
        // 登録情報の送信が完了or未了で表示を切り替える
        <div className="w-96 ml-auto mr-auto">
            
            { registerCheck.status ? 
                <RegisterForm setRegisterCheck={setRegisterCheck} /> 
                : 
                <EmailVerify email={registerCheck.email} /> 
            }
        
        </div>
    );
    
    
}

export default Register;
