import React from 'react'
import '../BreadCrum/BreadCrum.css'
import arrow from '../Assets/breadcrum_arrow.png'
const BreadCrum = (props) => {
    return (
        <div className='breadcrum'>
            HOME<img src={arrow}></img>SHOP<img src={arrow}></img>Women<img src={arrow}></img>{props.name}
        </div>
    )
}

export default BreadCrum