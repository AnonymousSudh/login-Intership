import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Ic_logo from "../assests/ic_user.svg";
import Zaperon from "../assests/zaperon_logo.jpg";

function Home() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");

    const checkLogin = async () => {
        const allCookie = document.cookie
        console.log(allCookie)
        if (allCookie.includes("intership")) {
            const allCookiesss = allCookie.split(";")
            const token = allCookiesss[0].slice(10);
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
            // console.log(userdata);
            const data = await userdata.json();
        
            setUsername(data[0].email)

            if (userdata.status == 200) {
                navigate("/home")
            }

        }
        else {
            navigate("/")
        }

    }

    useEffect(() => {
        checkLogin();
    }, [])
    return (
        <>
            <div className="loginDiv">
                <div className="imgHolder">

                    <img className='Ic_user' src={Ic_logo} alt="" />
                </div>
                <h1 className='WelcomeHeading'>Welcome {username}</h1>
                <p className='miniHeading'>Let's connect to your workspace. Please enter your credentials to continue.</p>

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

export default Home