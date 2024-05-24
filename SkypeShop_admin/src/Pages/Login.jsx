import React from 'react'
import './Login.css'
import loginimg from '../assets/loginimg.jpg'
import { useState } from 'react'
const Login = () => {
    const login = () => {
        window.location = '/admin'
    }
    const signup = () => {
        window.location = '/admin'
    }
    const [state, setstate] = useState("Login")
    const [formdata, setformdata] = useState({
        name: "",
        email: "",
        password: ""
    })
    const formhandler = (e) => {
        setformdata({ ...formdata, [e.target.name]: e.target.value })
    }
    return (
        <div className='homelogin'>

            <div className='logins'>


                <div className="loginimg">
                    <img src={loginimg}></img>
                </div>
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

        </div>
    )
}

export default Login