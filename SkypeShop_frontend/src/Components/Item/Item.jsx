import React from 'react'
import { Link } from "react-router-dom"
import './item.css'
import { useContext } from 'react'
import ShopContext from '../../Context/ShopContext/ShopContext'

const Item = (props) => {

    return (
        <div className='product'>

            <div className='image'>
                <Link to={`/product/${props.id}`}><img src={props.image} onClick={window.scrollTo(0, 0)}></img></Link>
            </div>

            <div className='text'>

                <p>{props.name}</p>

                <div className="price">
                    <span>${props.new_price}</span>
                    <span style={{ color: 'grey', textDecoration: 'line-through' }}>${props.old_price}</span>
                </div>

            </div>

        </div>
    )
}

export { Item }