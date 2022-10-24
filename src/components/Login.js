import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/");
            props.showAlert(`You were missed ${json.name}. Welcome Back!`, "success");
        }
        else {
            props.showAlert("Invalid credentials", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.id]: e.target.value });
    }

    return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div>
                <h2 className='mt-5 mb-5 fw-bolder typewriter'>Save your notes on the cloud</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 mt-5">
                        <label htmlFor="email" className="form-label text-center" style={{ width: '100%' }}>Email address</label>
                        <div className='sign-in-input-con'>
                            <input type="email" placeholder="Email" className="form-control text-center sign-in-input" id="email" name="email " aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label text-center" style={{ width: '100%' }}>Password</label>
                        <div className='sign-in-input-con'>
                            <input type="password" placeholder='Password' className="form-control text-center sign-in-input" id="password" name="password" value={credentials.password} onChange={onChange} />
                        </div>
                    </div>
                    <p className='text-center my-5'>Don't have an account?<span><Link to="/signup" className='log-in-sign-up-a'>Sign Up Now</Link></span></p>
                    <div className='sign-in-input-con'>
                        <button type="submit" className="btn btn-dark sign-in-btn" ><i class="fa-solid fa-door-open"></i> Log In</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login