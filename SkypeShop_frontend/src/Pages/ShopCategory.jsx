import React, { useContext } from 'react'
import '../Pages/CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import { Item } from '../Components/Item/Item'


const ShopCategory = (props) => {  //getting props from app.js
    console.log(props)
    const { all_products } = useContext(ShopContext)
    return (
        <div className='shopcat'>

            <div className='banimg'>
                <img src={props.banner} alt='' ></img>
            </div>
            <div className="index">
                <p>
                    <span>Showing 1-12</span> out of 36 products
                </p>
                <div className="sort">
                    <button>Sort <img src={dropdown_icon}></img></button>
                </div>
            </div>


            <div className="prods">
                {all_products.map((val, index) => {
                    if (val.category === props.category) {
                        return <Item key={index} id={val.id} name={val.name} image={val.image} new_price={val.new_price} old_price={val.old_price} />
                    }
                })}
            </div>


            <div className='load'>
                <button>Explore</button>
            </div>
        </div>
    )
}

export { ShopCategory }