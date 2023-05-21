//ログイン状態でないとアクセスできないようにページ制御する

import { Route, Redirect } from 'react-router-dom';

const get_status = localStorage.getItem('auth_status');

const Auth = props =>

    get_status == 200 ? <Route {...props} /> : <Redirect to={'/login'} /> ;


export default Auth;