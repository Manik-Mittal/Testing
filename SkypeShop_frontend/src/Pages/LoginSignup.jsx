import React from 'react'
import './CSS/LoginSignup.css'
const LoginSignup = () => {
    return (
        <div className='login'>
            <div className="loginarea">
                <h1>Sign Up</h1>
                <div className="form-info">
                    <input id='name' placeholder='Your Name' required></input>
                    <input type='email' id='email' placeholder='Email Address' required></input>
                    <input minlength='8' id='password' placeholder='Password' required></input>
                    <button>Continue</button>
                </div>

                <div className="checks">
                    <p>
                        Already have an account here ? <span>Login here</span>
                    </p>
                    <input type="checkbox" id="terms" required />
                    <label for="terms">I agree to the terms and conditions</label>
                </div>

            </div>
        </div>
    )
}

export { LoginSignup }