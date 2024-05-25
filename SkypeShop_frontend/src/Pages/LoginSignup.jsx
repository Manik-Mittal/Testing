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
        await fetch('https://skypeshop.onrender.com/login', {
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

        if (!formdata.name || !formdata.email || !formdata.password) {
            return;
        }
        if (!formdata.email.includes("@") || !formdata.email.includes(".com")) {
            alert('Enter valid email');
            return;
        }

        console.log("signup", formdata)
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
        <form>
            <div className='login'>


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
        </form>
    )
}

export { LoginSignup }