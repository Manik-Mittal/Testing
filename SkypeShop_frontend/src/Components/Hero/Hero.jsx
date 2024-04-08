import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero_image.mp4'
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <div className='hero'>

            <div className="left">
                <h2>New Arrivals Only</h2>
                <div className='left-text'>
                    <p>India's</p>
                    <img src={hand_icon} alt='' ></img>
                </div>
                <p className='para1'>First</p>
                <p className='para2'>
                    Alive Mart
                </p>
                <button className='colbut'>Become a Seller
                    <img src={arrow_icon} alt=''></img>
                </button>

                <Link to='/live'>
                    <button className='colbut'>Explore Live
                        <img src={arrow_icon} alt=''></img>
                    </button>
                </Link>
            </div>

            <div className="right">
                <video autoPlay loop muted disablePictureInPicture className='back-video'>
                    <source src={hero_image} type="video/mp4" />
                </video>
            </div>
        </div>
    )
}

export { Hero }