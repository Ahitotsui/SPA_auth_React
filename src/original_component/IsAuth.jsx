//ログイン中ユーザーに表示させないページ制御するコンポーネント　
//ログイン＆新規登録ページは未承認の場合はアクセスできるが、ログインしたら見れないようするための処理をしている

import { Route, Redirect } from 'react-router-dom';



const get_status = localStorage.getItem('auth_status');


const IsAuth = props =>

    get_status == 200 ? <Redirect to={'/User'} /> :  <Route {...props} /> ;
    

export default IsAuth;