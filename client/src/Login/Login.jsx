import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Ic_logo from "../assests/ic_user.svg";
import Zaperon from "../assests/zaperon_logo.jpg";
import "./login.css";
require("./login.css");

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const userSignIn = async () => {
        const dat = await fetch('/sendUserData', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({
                email, password
            })
        })
        if (dat.status == 200) {
            navigate("/home")
        }
    }

    const checkLogin = async () => {
        // console.log(res.cookies);
        const allCookie = document.cookie
        console.log(allCookie)
        const allCookiesss = allCookie.split(";")
        const userid = allCookiesss[1].slice(15, -3);
        const token = allCookiesss[0].slice(10);
        console.log(token);
        console.log(userid);
        if (token) {
            console.log("cookies present at frontend");
            console.log(token);
            const userdata = await fetch('/getToken', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    token
                })
            })
            console.log(userdata)
            if(userdata.status==200){
            navigate("/home")
            }
        }
        else {
            navigate("/")
        }

    }

    useEffect(() => {
            console.log("refeeshed");
            checkLogin();
    },[])

    return (
        <>
            <div className="loginDiv">
                <div className="imgHolder">

                    <img className='Ic_user' src={Ic_logo} alt="" />
                </div>
                <h1 className='WelcomeHeading'>Welcome</h1>
                <p className='miniHeading'>Let's connect to your workspace. Please enter your credentials to continue.</p>

                <div className="credentialDiv">
                    <input type="email" name="email" id="emailInput" placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" name="password" id="passwordInput" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="forgetPassDiv">
                    <h1>Forgot Password?</h1>
                </div>

                <button className='signIn' onClick={userSignIn}>Sign In</button>

                <div className="footer">
                    <div className="poweredBy">
                        <p className='textPower'>Powered by</p>
                        <img src={Zaperon} alt="" />
                    </div>


                    <div className="service">
                        <h1 className='helpText'>Need Help?</h1>
                        <h1 className='privacyText'>Privacy Policy <span>&</span> Terms</h1>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login