
import React, {Component} from 'react';

    const isAuth = localStorage.getItem('isAuth');
    function Home(){
        
        return(
            <div className="w-96 ml-auto mr-auto">
                <h2 className="text-7xl">ホーム</h2>
                <p>ここはホームです</p>
                <p>アクセス制限の無い、誰でも閲覧できるページです。</p>
                <p>Authローカルストレージ状態:{isAuth}</p>
            </div>
        );
    }


export default Home;