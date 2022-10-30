import { gapi } from 'gapi-script';
import React, { useState, useEffect } from 'react';
import { GoogleLogin } from "react-google-login"
import "../Styles/Login.css"
import { useHistory } from 'react-router-dom'


const Login = (props) => {
    const clientId = "713414238890-glflm5bvp0tj1sv7d4v27kipq1j2h2p1.apps.googleusercontent.com";
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    let history = useHistory();

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: ""
            })
        }
        gapi.load("client:auth2", start)
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            props.showMsg("Login successfull, you are being rediredcted", "success");
            setTimeout(()=>{
                history.push("/")
            },1500)
        }
        else{
            props.showMsg("Incorrect credentials, please login with correct credentials.", "danger")
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    const onSuccess = async (res) => {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: res.profileObj.email, password: res.profileObj.googleId })
        });
        const json = await response.json()
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            props.showMsg("Login successfull, you are being rediredcted", "success");
            setTimeout(() => {

                history.push("/")
            }, 2000)
        }else {
            props.showMsg("Somme error occured", "danger")
        }
    }
    const onFailure = (res) => {
        console.log(res)
    }

    return (
        <div className='container d-flex flex-column justify-content-center align-items-center mt-5 login-form py-5 rounded' >
        <h2 className='mb-4'>Welcome back!</h2>
        <form onSubmit={handleSubmit} className="loginForm d-flex flex-column align-items-center justify-content-center ">
            <div className="mb-3" >
                <label htmlFor="userEmail" className="form-label">Email address</label>
                <input type="email" className="form-control form-control-lg w-100" id="userEmail" aria-describedby="emailHelp" name="email" value={credentials.email} onChange={onChange} required/>
                
            </div>
            <div className="mb-3">
                <label htmlFor="userPassword" className="form-label">Password</label>
                <input type="password" className="form-control form-control-lg w-100" id="userPassword" name="password" minLength={5} value={credentials.password} onChange={onChange} required/>
            </div>
            <button type="submit" className="btn btn-primary login_btn">Login</button>
        </form>
        <div id="signInButton" className='w-75 py-3 text-center'>
                    <GoogleLogin
                        clientId={clientId}
                        buttonText="Login with Google"
                        theme='dark'
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        isSignedIn={false}
                    />
                </div>
    </div>
    )
}

export default Login
