import { gapi } from 'gapi-script';
import React, { useState, useEffect } from 'react';
import { GoogleLogin } from "react-google-login"
import "../Styles/Signup.css"
import { useHistory } from "react-router-dom";

const Signup = (props) => {
    const clientId = "713414238890-glflm5bvp0tj1sv7d4v27kipq1j2h2p1.apps.googleusercontent.com";
    const history = useHistory();
    const [details, setDetails] = useState({ name: "", email: "", password: "" });

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: ""
            })
        }
        gapi.load("client:auth2", start)
    })


    const signUpUser = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: details.name, email: details.email, password: details.password })
        });
        const json = await response.json()
        // console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            props.showMsg("Signup successfull, you are being rediredcted", "success");
            setTimeout(() => {

                history.push("/")
            }, 1500)
        }
        else {
            props.showMsg("Incorrect data provided.", "warning");
        }

    }

    const changeDetails = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value })
    }

    const onSuccess = async(res) => {
        console.log(res.profileObj)
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: res.profileObj.givenName, email: res.profileObj.email, password: res.profileObj.googleId })
        });
        const json = await response.json()
        // console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            props.showMsg("Signup successfull, you are being rediredcted", "success");
            setTimeout(() => {

                history.push("/")
            }, 1500)
        }
        else {
            props.showMsg("User already exist please login.", "warning");
        }
    }
    const onFailure = (res) => {
        console.log(res)
    }
    return (
        <>
            <div className='container d-flex flex-column justify-content-center align-items-center mt-5 signup-form py-5 rounded' >
                <h2 className='mb-4'>Join us</h2>
                <form onSubmit={signUpUser} className="signUpForm d-flex flex-column align-items-center justify-content-center ">
                    <div className="mb-3" >
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control form-control-lg w-100" id="name" aria-describedby="name" name="name" value={details.name} minLength={4} onChange={changeDetails} required />
                    </div>
                    <div className="mb-3" >
                        <label htmlFor="userEmail" className="form-label ">Email address</label>
                        <input type="email" className="form-control form-control-lg  w-100" id="userEmail" aria-describedby="emailHelp" name="email" value={details.email} onChange={changeDetails} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="userPassword" className="form-label">Password</label>
                        <input type="password" className="form-control form-control-lg w-100 " id="userPassword" name="password" minLength={6} value={details.password} onChange={changeDetails} required />
                    </div>
                    <button type="submit" className="btn btn-primary form-control-lg signup_btn" >Sign up</button>

                </form>
                <div id="signInButton" className='w-75 py-3 text-center'>
                    <GoogleLogin
                        clientId={clientId}
                        buttonText="Signup using Google"
                        theme='dark'
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        isSignedIn={false}
                    />
                </div>
            </div>
        </>
    )
}

export default Signup
