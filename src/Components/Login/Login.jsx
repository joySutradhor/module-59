import React, { useRef, useState } from 'react';
import "./login.css"
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';


const auth = getAuth(app);
const Login = () => {
    const [success, setSuccess] = useState(null);
    const [err, setErr] = useState(null);
    const emailRef = useRef() ;
    const handleLogin = (event) => {
        event.preventDefault();
        setSuccess(null)
        setErr(null)
        const form = event.target;
        const email = form.email.value;
        const pass = form.password.value;
  
        signInWithEmailAndPassword(auth, email, pass)
            .then(result => {
                if(! result.user.emailVerified){
                    alert("please verified your email")
                    return ;
                }
                setSuccess("Login successfully")
                console.log(result.user)
                event.target.reset() ;
            })
            .catch(err => {
                setErr(err.message)
                if (err) {
                    event.target.password.value = "";
                }
            })
    }

    const handlePassword = () => {
        const email = emailRef.current.value ;
        if( ! email) {
            alert("your Email is empty")
            return ;
        }
        sendPasswordResetEmail(auth , email)
        .then(result => {
            alert("reset password link send in Email")
        })
        .catch(err => {
            setErr(err.message)
        })
    }
    return (
        <div>
            <h2>Login</h2>
            <form className='login' onSubmit={handleLogin}>
                <input type="email" name="email" id="email" ref={emailRef} placeholder='Enter your Email' required />
                <input type="password" name="password" id="password" placeholder='Enter your password' required />
                <button type="submit">Login</button>
                <p><Link onClick={handlePassword} >Forget Password</Link> </p>
                <p>Do not Register <Link to="/register">Register</Link></p>
            </form>
            <div className='msg'>
                <p>{err}</p>
                <p>{success}</p>
            </div>
        </div>
    );
};

export default Login;