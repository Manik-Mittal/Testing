import React from 'react'
import './Offer.css'
import exculsive_image from '../Assets/exclusive_image.png'
const Offer = () => {
    return (
        <div className='offers'>
            <div className="lefto">
                <p className='opara'>Exclusive </p>
                <p className='opara'>Offers For Women</p>
                <p className='spant'> Only on Best Sellers Products</p>
                <button>Check Know</button>
            </div>

            <div className="righto">
                <img src={exculsive_image} alt=''></img>
            </div>
        </div>
    )
}

export { Offer }