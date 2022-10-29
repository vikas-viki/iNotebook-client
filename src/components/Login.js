import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'


const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    let history = useHistory();

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

    return (
        <div className='container d-flex flex-column justify-content-center align-items-center mt-5 login-form py-5 rounded' >
        <h2 className='mb-4'>Welcome back!</h2>
        <form onSubmit={handleSubmit} style={{ width: "30%" }}>
            <div className="mb-3" >
                <label htmlFor="userEmail" className="form-label">Email address</label>
                <input type="email" className="form-control" id="userEmail" aria-describedby="emailHelp" name="email" value={credentials.email} onChange={onChange} required/>
                
            </div>
            <div className="mb-3">
                <label htmlFor="userPassword" className="form-label">Password</label>
                <input type="password" className="form-control" id="userPassword" name="password" minLength={5} value={credentials.password} onChange={onChange} required/>
            </div>
            <button type="submit" className="btn btn-primary " style={{width: "75%", marginLeft: "12%"}}>Login</button>
        </form>
    </div>
    )
}

export default Login
