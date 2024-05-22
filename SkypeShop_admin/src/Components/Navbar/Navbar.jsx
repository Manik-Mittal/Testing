import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/nav-logo.svg'
import profilelogo from '../../assets/nav-profile.svg'
const Navbar = () => {
    return (
        <div className='navcont'>
            <div className='navbar'>
                <div className="images">
                    <div className="img1">
                        <img src={navlogo}></img>
                    </div>
                    <div className="img2">
                        <img src={profilelogo}></img>
                    </div>

                </div>

            </div>
            <hr />
        </div>


    )
}

export default Navbar