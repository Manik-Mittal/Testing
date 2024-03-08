import React from 'react'
import './popular.css'
import { Item } from '../Item/Item'
import data_product from '../Assets/data'

const Popular = () => {
    return (
        <>
            <div className='popular'>
                <h1>POPULAR IN WOMEN
                    <hr />
                </h1>

            </div>
            <div className="popular_items">

                {data_product.map((item, index) =>
                    <Item key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                )}
            </div>
        </>

    )
}

export { Popular }