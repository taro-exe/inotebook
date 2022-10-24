import React, { useState, useEffect } from 'react';

const Profile = (props) => {

    const [details, setDetails] = useState([]);
    const getUser = async () => {
        const response = await fetch("http://localhost:5000/api/auth/getuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json);
        setDetails(json);
        let date = new Date(json.date);
        json.date = date.toDateString();
    }

    useEffect(() => {
        getUser();
    }, [])

    const onClick = () => {
        props.showAlert("Profile editing feature is yet to be implemented. Sorry for the incovenience.", "danger");
    }


    return (
        <>
            <div className='container' style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', position: 'relative' }}>
                <div>
                    <div style={{ position: 'relative', background: 'orange', color: 'white', padding: '30px', borderRadius: '50%' }}>
                        <lord-icon
                            src="https://cdn.lordicon.com/tohoduub.json"
                            trigger="loop"
                            delay="2000"
                            colors="outline:#121331,primary:#ff9900,secondary:#3a3347"
                            style={{ width: "40vh", height: "40vh" }}>
                        </lord-icon>
                    </div>
                </div>
                <div className='details-con'>
                    <div>
                        <h1 className='mb-3'>{details.name} <button type="button" class="btn btn-dark"><i className="fa-solid fa-pen" onClick={onClick}></i></button></h1>
                    </div>
                    <div>
                        <h4><i className="fa-solid fa-envelope"></i>   {details.email}</h4>
                        <h4><i class="fa-solid fa-clock"></i>    Joined since {details.date}</h4>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;