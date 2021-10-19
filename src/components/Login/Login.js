import React from 'react'
import { signInWithGoogle } from '../../Firebase/firebase.utils'
import './Login.css'
import logo from './wtw.PNG'

const Login = () => {
    return (
        <div className="login">
            <div className="login__container">
                <div className="login__text">
                    <h1>Welcome to Whatsapp</h1>
                </div>
                <div className="login__image">
                    <img src={logo} alt=''/>
                </div>
                <div className="login__story">
                    <h3>With your Google account, setting up an account with us is literally with the click of button.</h3>
                    <h4>If you've signed in before and you didn't sign out, you'll be redirected to the homepage automatically.</h4>
                </div>

                <div className="login__button" onClick={signInWithGoogle}>
                    <div className="login__logo">
                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1004px-Google_%22G%22_Logo.svg.png' alt=''/>
                        </div>
                        <div className="button__started">LET'S GET STARTED</div>
                </div>
            </div>

        </div>
    )
}

export default Login
