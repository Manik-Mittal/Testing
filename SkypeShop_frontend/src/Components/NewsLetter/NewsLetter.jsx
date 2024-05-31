import React, { useState } from 'react'
import './NewsLetter.css'
const NewsLetter = () => {
    const [email, setemail] = useState("")
    const subsscribe = (e) => {
        console.log(1)
        e.preventDefault();
        if (email == "") alert('Kindly Fill your email id before submitting')
        else alert('Thanks for Subscribing Us we will keep notifying you about latest sales and discounts')
        setemail("")
    }
    const emailhandler = (e) => {
        setemail(e.target.value)
    }
    return (
        <form onSubmit={subsscribe}>
            <div className='Newsletter'>
                <div className="text-cont">
                    <h1>Get Exclusive  Offers On Your E-mail</h1>
                    <p>Subscribe to our newsletter and stay updates</p>
                    <div className="sub">
                        <input required type='email' placeholder='Enter Your Email' value={email} onChange={emailhandler} />
                        <button type='submit' >Subscribe</button>
                    </div>

                </div>


            </div>
        </form>
    )
}

export { NewsLetter }