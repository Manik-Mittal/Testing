import React, { useState } from 'react'
import './CSS/LoginSignup.css'
import loginimg from '../Components/Assets/loginimage.jpg'

const LoginSignup = () => {
    const [state, setstate] = useState("Login")
    const [formdata, setformdata] = useState({
        name: "",
        email: "",
        password: ""
    })

    const formhandler = (e) => {
        setformdata({ ...formdata, [e.target.name]: e.target.value })
    }

    const login = async () => {
        if (!formdata.email || !formdata.password) {
            return;
        }
        if (!formdata.email.includes("@") || !formdata.email.includes(".com")) {
            alert('Enter valid email');
            return;
        }

        let token;
        let msg;
        await fetch('https://skypeshop.onrender.com/login', {
            method: 'POST',
            headers: {
                Accept: 'application/formdata',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formdata)
        }).then((response) => {
            if (!response) {
                response.json({ msg: "unable to post" })
            }
            return response.json()
        }).then((data) => {
            token = data.token
            msg = data.msg
        }).catch((err) => {
            console.log(err)
        })

        if (token) {
            localStorage.setItem('auth-token', token)
            window.location.replace("/");
        }
        else {
            alert(msg)
        }
    }

    const signup = async () => {
        if (!formdata.name || !formdata.email || !formdata.password) {
            return;
        }
        if (!formdata.email.includes("@") || !formdata.email.includes(".com")) {
            alert('Enter valid email');
            return;
        }

        let token;
        await fetch('https://skypeshop.onrender.com/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/formdata',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formdata)
        }).then((response) => {
            if (!response) {
                response.json({ msg: "unable to post" })
            }
            return response.json()
        }).then((data) => {
            token = data.token
        }).catch((err) => {
            console.log(err)
        })

        if (token) {
            localStorage.setItem('auth-token', token)
            window.location.replace("/");
        }
        else {
            alert("User already exists, please retry ")
            window.location.replace("/loginSignup");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (state === "Login") {
            login();
        } else {
            signup();
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='login'>
                <div className="loginimg">
                    <img src={loginimg} alt="login" />
                </div>
                <div className="loginarea">
                    <h1>{state}</h1>
                    <div className="form-info">
                        {state === "Signup" ?
                            <input name="name" value={formdata.name} id='name' placeholder='Your Name' required onChange={formhandler}></input> :
                            <input id='name' value={formdata.name} type='hidden' placeholder='Your Name' required onChange={formhandler}></input>}
                        <input name="email" type='email' value={formdata.email} id='email' placeholder='Email Address' required onChange={formhandler}></input>
                        <input name="password" type='password' value={formdata.password} id='password' placeholder='Password' required onChange={formhandler}></input>
                        <button type="submit">Continue</button>
                    </div>

                    <div className="checks">
                        {state === "Login" ?
                            <p>Not yet registered? Create Account <span style={{ cursor: 'pointer' }} onClick={() => { setstate("Signup") }}>Signup here</span></p> :
                            <p>Already have an account? <span style={{ cursor: 'pointer' }} onClick={() => { setstate("Login") }}>Login here</span></p>
                        }
                    </div>
                </div>
            </div>
        </form>
    )
}

export { LoginSignup }
