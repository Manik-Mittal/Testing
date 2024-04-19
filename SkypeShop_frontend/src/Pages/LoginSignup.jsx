import React, { useState } from 'react'
import './CSS/LoginSignup.css'

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
        console.log("login", formdata)
        let token;
        await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/formdata',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formdata)
        }).then((response) => {
            if (!response) {
                response.json({ msg: "ubale to post" })
            }
            return response.json()
        }).then((data) => {
            token = data.token
            console.log(data)
        }).catch((err) => {
            console.log(err)
        })

        if (token) {
            localStorage.setItem('auth-token', token)
            window.location.replace("/");
        }
        else {
            alert("Wrong password or email please retry")
        }
    }
    const signup = async () => {
        let token;
        console.log("signup", formdata)
        await fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/formdata',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formdata)
        }).then((response) => {
            if (!response) {
                response.json({ msg: "ubale to post" })
            }
            return response.json()
        }).then((data) => {
            token = data.token
            console.log(data)
        }).catch((err) => {
            console.log(err)
        })

        if (token) {
            localStorage.setItem('auth-token', token)
            window.location.replace("/");
        }
        else {
            alert("User already exits retry ")
        }
    }


    return (
        <div className='login'>
            <div className="loginarea">
                <h1>{state}</h1>
                <div className="form-info">
                    {state === "Signup" ? <input name="name" value={formdata.name} id='name' placeholder='Your Name' required onChange={formhandler}></input> : <input id='name' value={formdata.name} type='hidden' placeholder='Your Name' required onChange={formhandler}></input>}
                    <input name="email" type='email' value={formdata.email} id='email' placeholder='Email Address' required onChange={formhandler}></input>
                    <input minlength='8' name="password" value={formdata.password} id='password' placeholder='Password' required onChange={formhandler}></input>
                    <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>
                </div>

                <div className="checks">

                    {state === "Login" ? <p>
                        Not yet registered ? Create Account  <span style={{ cursor: 'pointer' }} onClick={() => { setstate("Signup") }}>  Signup here </span>
                    </p> : <p>
                        Already have an account here ? <span style={{ cursor: 'pointer' }} onClick={() => { setstate("Login") }}>   Login here</span>
                    </p>
                    }


                    <input type="checkbox" id="terms" required />
                    <label for="terms">I agree to the terms and conditions</label>
                </div>

            </div>
        </div >
    )
}

export { LoginSignup }