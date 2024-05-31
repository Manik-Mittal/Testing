import React from 'react'
import './Login.css'
import loginimg from '../assets/loginimg.jpg'
import { useState } from 'react'
import { useEffect } from 'react'

const Login = () => {


    const [state, setstate] = useState("Login")
    const [formdata, setformdata] = useState({
        name: "",
        email: "",
        password: ""
    })


    const login = async (e) => {
        e.preventDefault();
        console.log(formdata)

        let token;
        try {
            e.preventDefault();
            console.log(formdata)
            await fetch('http://localhost:5000/loginadmin', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formdata)
            }).then((response) => {
                if (!response.ok) {
                    return response.json({ msg: "unable to post" })
                }
                return response.json()
            }).then((data) => {
                token = data.msg
            }).catch((err) => {
                console.log(err)
            })

            if (token) {
                localStorage.setItem('auth-token', token)
                window.location = '/admin'
            }
            else {
                alert('Enter correct credetials')
            }
        }
        catch (err) {
            console.log(err.msg)
        }

    }


    const signup = async (e) => {
        let token;
        try {
            e.preventDefault();
            console.log(formdata)
            await fetch('http://localhost:5000/signupadmin', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formdata)
            }).then((response) => {
                if (!response.ok) {
                    response.json({ msg: "unable to post" })
                }
                return response.json()
            }).then((data) => {
                token = data.msg

            }).catch((err) => {
                console.log(err)
            })

            if (token) {
                localStorage.setItem('auth-token', token)
                window.location = '/admin'
            }
            else {
                alert("User Already exists")
            }
        }
        catch (err) {
            console.log(err)
        }


    }

    const formhandler = (e) => {
        setformdata({ ...formdata, [e.target.name]: e.target.value })
    }

    const submithandler = (e) => {
        if (state == "Login") login(e);
        else signup(e);
    }

    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
            window.location = "/admin"
        }
    }, [])

    return (

        <form onSubmit={submithandler}>

            <div className='homelogin'>
                <h1 className='loginhead'>Admin Dashboard</h1>
                <div className='logins'>


                    <div className="loginimg">
                        <img src={loginimg}></img>
                    </div>
                    <div className="loginarea">
                        <h1>{state}</h1>
                        <div className="form-info">
                            {state === "Signup" ? <input name="name" value={formdata.name} id='name' placeholder='Your Name' required onChange={formhandler}></input> : <input id='name' value={formdata.name} type='hidden' placeholder='Your Name' required onChange={formhandler}></input>}
                            <input name="email" type='email' value={formdata.email} id='email' placeholder='Email Address' required onChange={formhandler}></input>
                            <input name="password" value={formdata.password} id='password' placeholder='Password' required onChange={formhandler}></input>
                            <button type="submit">Continue</button>
                        </div>

                        <div className="checks">

                            {state === "Login" ? <p>
                                Not yet registered ? Create Account  <span style={{ cursor: 'pointer' }} onClick={() => { setstate("Signup") }}>  Signup here </span>
                            </p> : <p>
                                Already have an account here ? <span style={{ cursor: 'pointer' }} onClick={() => { setstate("Login") }}>   Login here</span>
                            </p>
                            }
                        </div>

                    </div>
                </div >

            </div>
        </form>
    )
}

export default Login