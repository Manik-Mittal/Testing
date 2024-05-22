import React, { useContext, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from "react-router-dom"
import { ShopContext } from '../../Context/ShopContext/ShopContext'

const Navbar = () => {
    const [menu, setmenu] = useState("shop")
    const { totalproducts } = useContext(ShopContext)


    const logoutuser = () => {
        localStorage.removeItem('auth-token');
        window.location.replace("/")
    }

    return (
        <>
            <div className='navbar'>

                <div className='nav-logo'>
                    <img src={logo} alt=""></img>
                    <p>SkypeShop</p>
                </div>

                <ul className='nav-menu'>
                    <li onClick={() => { setmenu("shop") }}  > <Link to="/" style={{ textDecoration: 'none' }}>Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
                    <li onClick={() => { setmenu("men") }} ><Link to="/men" style={{ textDecoration: 'none' }}>Men</Link> {menu === "men" ? <hr /> : <></>}</li>
                    <li onClick={() => { setmenu("women") }} ><Link to="/women" style={{ textDecoration: 'none' }}>Women</Link>{menu === "women" ? <hr /> : <></>}</li>
                    <li onClick={() => { setmenu("children") }} ><Link to="/kids" style={{ textDecoration: 'none' }}>Kids</Link>{menu === "children" ? <hr /> : <></>}</li>
                </ul>

                <div className="nav-login-cart">

                    {localStorage.getItem('auth-token') ? <button onClick={() => { logoutuser() }}>Logout</button> : <Link to="/loginSignup"><button >Login</button></Link>}

                    <Link to="/cart"><img src={cart_icon} alt=""></img></Link>
                    <div className="nav-cart-count">{totalproducts()}</div>
                </div>
                <div className="nav-divider">
                    <hr className="rules" />
                </div>

            </div >

        </>
    )
}

export { Navbar }
