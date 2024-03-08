import React from 'react'
import './Footer.css'
import logo from '../Assets/logo.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'
import instagram_icon from '../Assets/instagram_icon.png'
import pintester_icon from '../Assets/pintester_icon.png'
const Footer = () => {
    return (
        <div className='footer'>
            <div className="footc">
                <img src={logo} alt=''></img>
                <h1>SkypeShop</h1>
            </div>

            <ul className='list'>
                <li>Company</li>
                <li>Offices</li>
                <li>Products</li>
                <li>About</li>
                <li>Contact</li>
            </ul>

            <ul className='list'>
                <li><img src={whatsapp_icon}></img></li>
                <li><img src={pintester_icon}></img></li>
                <li><img src={instagram_icon}></img></li>
            </ul>
            <hr />
            <p>Copyright @ 2024 - All Rights Reserved</p>

        </div >
    )
}

export { Footer }