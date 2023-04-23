import React, { useState } from 'react';
import "./register.css"

import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';



const auth = getAuth(app);
const Register = () => {
    const [err, setErr] = useState(null);
    const [success, setSuccess] = useState(null);
    const handleRegister = (event) => {
        setErr(null);
        setSuccess(null);
        event.preventDefault();
        const email = event.target.email.value;
        const pass = event.target.password.value;
        const name = event.target.name.value ;

        if (!/^[a-zA-Z0-9@#$%^&*]{6,16}$/.test(pass)) {
            setErr("password should contain atleast one number and one special character")
            return;
        }


        createUserWithEmailAndPassword(auth, email, pass)
            .then(result => {
                const data = result.user;
                setSuccess("Register Done successfully")
                event.target.reset();
                sendEmailverifyLink(result.user)
                userUpdateProfile (result.user , name )
            })
            .catch(err => {
                setErr(err.message)
            })
    }
    const sendEmailverifyLink = (user) => {

        sendEmailVerification(user) 
            .then(result => {
                alert("Check Email varification link sent")

            })
    }

    const userUpdateProfile = (updatedData , name) => {
        updateProfile (updatedData , {
            displayName : name ,
        })
        .then ( () => {
            console.log(updatedData);
            console.log("name updated")
        } )
        .catch ( (err) => {
            setErr(err.message)
        })
    }
    return (
        <div>
            <h2> Register</h2>
            <form onSubmit={handleRegister}>
                <input type="text" name="name" id="name" placeholder='Your name' required /> <br />
                <input type="email" name="email" id="email" placeholder='Your Email' required />
                <br />
                <input type="password" name="password" id="password" placeholder='Your Password' required />
                <br />
                <button type="submit">Register</button>
                <p>Already Registered <Link to="/login">Login</Link></p>
            </form>
            <p>{err}</p>
            <p>{success}</p>
        </div>
    );
};

export default Register;