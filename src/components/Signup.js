import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = (props) => {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let { name, email, password, cpassword } = credentials
        if (password !== cpassword) {
            props.showAlert("Passwords doesn't match", "danger");
        }
        else {
            const response = await fetch("http://localhost:5000/api/auth/createuser", {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });
            const json = await response.json();
            console.log(json);

            if (json.success) {
                //save the auth token and redirect
                localStorage.setItem('token', json.authtoken);
                navigate("/");
                props.showAlert(`Account created successfully. Welcome ${json.name}`, "success");
            }
            else if (json.success === 'Exists') {
                props.showAlert("User with this email already exists. Please use another email", "danger");
            }
            else {
                props.showAlert("Invalid detials", "danger");
            }
        }


    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.id]: e.target.value });
    }

    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <div className='mt-5'>
                <h2 className='fw-bolder mb-5'>Create an account to use iNotebook</h2>
                <form className="mt-4" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" id="password" onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <input type="password" name="cpassword" className="form-control" id="cpassword" onChange={onChange} minLength={5} required />
                    </div>
                    <p>Already have an account?<Link className='log-in-sign-up-a' to='/login'>Log In</Link></p>
                    <button type="submit" className="btn btn-dark mt-3" style={{ width: "100%" }}>Sign Up</button>
                </form>
            </div>
            <div>
                <lord-icon
                    src="https://cdn.lordicon.com/qtqvorle.json"
                    trigger="loop"
                    delay="2000"
                    colors="outline:#121331,primary:#ff9900,secondary:#ebe6ef,tertiary:#ff9900"
                    style={{ width: "69vh", height: "69vh" }}>
                </lord-icon>
            </div>
        </div>
    )
}

export default Signup