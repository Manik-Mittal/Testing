import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero_image.png'
import { Link } from "react-router-dom";
import TypingEffect from 'react-typing-effect';

const Hero = () => {
    return (
        <div className='hero'>

            <div className="left">
                <h1>New Arrivals Only</h1>
                <div className='left-text'>
                    <p>India's First</p>
                    <img src={hand_icon} alt='' ></img>
                </div>
                {/* <p className='para1'>First</p> */}
                <p className='para2'>

                    <TypingEffect
                        text={['Live Stream']}
                        speed={100}      // Speed at which the text is typed (in milliseconds)
                        eraseSpeed={100}  // Speed at which the text is erased (in milliseconds)
                        typingDelay={100}  // Delay before typing starts (in milliseconds)
                        eraseDelay={100} // Delay before erasing starts (in milliseconds)
                    />
                    <br></br>
                    Selling Platform

                </p>
                <a href='https://skypeshop-1.onrender.com/'> <button onClick={() => { alert('Kindly wait while the admin server is being activated ') }} className='colbut'>Become a Seller
                    <img src={arrow_icon} alt=''></img>
                </button></a>


                <Link to='/live'>
                    <button className='colbut'>Explore Live
                        <img src={arrow_icon} alt=''></img>
                    </button>
                </Link>
            </div>

            <div className="right">
                {/* <video autoPlay loop muted disablePictureInPicture className='back-video'>
                    <source src={hero_image} type="video/mp4" />
                </video> */}
                <img src={hero_image} alt='' ></img>
            </div>
        </div>
    )
}

export { Hero }


