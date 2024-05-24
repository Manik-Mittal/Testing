import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/logo.png'
import profilelogo from '../../assets/nav-profile.svg'
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='navcont'>
            <div className='navbar'>
                <div className="images">

                    <div className="img1">
                        <Link to='/'>
                            <img src={navlogo}></img>
                        </Link>
                    </div>

                </div>

            </div>
            <hr />
        </div>


    )
}

export default Navbar