import React from 'react'
import './Offer.css'
import exculsive_image from '../Assets/exclusive_image.png'
import { Link } from 'react-router-dom'
const Offer = () => {
    return (
        <div className='offers'>
            <div className="lefto">
                <p className='opara'>Exclusive </p>
                <p className='opara'>Offers For Women</p>
                <p className='spant'> Only on Best Sellers Products</p>
                <Link to='/women'> <button>Check Know</button></Link>
            </div>

            <div className="righto">
                <img src={exculsive_image} alt=''></img>
            </div>
        </div>
    )
}

export { Offer }