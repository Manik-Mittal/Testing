import React from 'react'
import './NewsLetter.css'
const NewsLetter = () => {
    return (
        <div className='Newsletter'>
            <div className="text-cont">
                <h1>Get Exclusive  Offers On Your E-mail</h1>
                <p>Subscribe to our newsletter and stay updates</p>
                <div className="sub">
                    <input type='email' placeholder='Enter Your Email' />
                    <button>Subscribe</button>
                </div>

            </div>


        </div>
    )
}

export { NewsLetter }