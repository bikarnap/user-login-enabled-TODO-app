import React from 'react';
import './LoginPage.css';

const LoginForm = (props) => {
    const {
        username
        , password
        , handleLogin
        , handleUsername
        , handlePassword
        , isLoginError        
    } = props;

    const inputStyle = isLoginError ? 'login-error' : 'login-input';
    return(
        <form onSubmit={handleLogin}> 
                <p>
                    <input 
                        type="text" 
                        id="email"
                        // style={inputStyle}
                        className={inputStyle}
                        name="email" 
                        value={username} 
                        onChange={handleUsername}
                        placeholder="EMAIL ID" 
                    />
                </p>
                <p>
                    <input 
                        type="password" 
                        id="password" 
                        className={inputStyle} 
                        name="password" 
                        value={password}
                        onChange={handlePassword}
                        placeholder="PASSWORD" 
                    />
                </p>
           

            <div className="login-error-message">
                {isLoginError ? `Username and password don't match!`:''}
            </div>
            
            <div>
                <button 
                    className="login-button" 
                    type="submit">NEXT
                </button>
            </div>
        </form>
    );    
};

export default LoginForm;