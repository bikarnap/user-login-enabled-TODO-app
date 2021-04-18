import React from 'react';

import LoginForm from './LoginForm';
import SVGImage from './SVGImage';
import TheRudolf from './TheRudolf';
import './LoginPage.css';

const LoginPage = (props) => {
    const {
        username
        , password       
        , handleLogin
        , handleUsername
        , handlePassword
        , isLoginError
    } = props;

    return(
        <div className="row">
            <div className="column left">
                <SVGImage />
            </div>
            <div className="column right">
                <TheRudolf />
                <div className="sign-in">Sign-in!</div>
                <LoginForm 
                    username={username}
                    password={password}
                    handleLogin={handleLogin}
                    handlePassword={handlePassword}
                    handleUsername={handleUsername}
                    isLoginError={isLoginError}
                />             
            </div>
        </div>
    );
};

export default LoginPage; 