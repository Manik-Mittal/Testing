import React, { useContext } from 'react'
import './popular.css'
import { Item } from '../Item/Item'
import { Oval } from 'react-loader-spinner'
import { ShopContext } from '../../Context/ShopContext/ShopContext'

const Popular = () => {
    let { products } = useContext(ShopContext)
    console.log(products.length)
    products = products.slice(3, 7)
    return (
        <>
            <div className='popular'>
                <h1>POPULAR IN WOMEN
                    <hr />
                </h1>

            </div>

            {products.length == 0 ?
                <div className="loader"><Oval
                    height={80}
                    width={80}
                    radius={9}
                    color="green"
                    ariaLabel="loading"
                    wrapperStyle={{}}
                    wrapperClass={{}}
                /></div>
                :
                <div className="popular_items">

                    {products.map((item, index) =>
                        <Item key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                    )}
                </div>
            }
        </>

    )
}

export { Popular }