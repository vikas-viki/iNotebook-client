import React, { useState } from 'react'
// import "../Styles/SignUp.css"
import { useHistory } from "react-router-dom";

const Signup = (props) => {
    const history = useHistory();
    const [details, setDetails] = useState({ name: "", email: "", password: "" });

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
            setTimeout(()=>{

                history.push("/")
            },1500)
        }
        else {
            props.showMsg("Incorrect data provided.", "warning");
        }

    }

    const changeDetails = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value })
    }
    return (
        <div className='container d-flex flex-column justify-content-center align-items-center mt-5 signup-form py-5 rounded' >
            <h2 className='mb-4'>Join us</h2>
            <form onSubmit={signUpUser} className="signUpForm">
                <div className="mb-3" >
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="name" name="name" value={details.name} onChange={changeDetails} required />
                </div>
                <div className="mb-3" >
                    <label htmlFor="userEmail" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="userEmail" aria-describedby="emailHelp" name="email" value={details.email} onChange={changeDetails} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="userPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="userPassword" name="password" minLength={6} value={details.password} onChange={changeDetails} required />
                </div>
                <button type="submit" className="btn btn-primary " style={{ width: "75%", marginLeft: "12%" }}>Sign up</button>

            </form>
        </div>
    )
}

export default Signup
