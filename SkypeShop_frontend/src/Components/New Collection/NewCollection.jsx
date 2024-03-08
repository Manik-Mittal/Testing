import React from 'react'
import './NewCollection.css'
import new_collections from '../Assets/new_collections'
import { Item } from '../Item/Item'
const NewCollection = () => {
    return (
        <div className='pops'>
            <div className='popular'>
                <h1>New Collections
                    <hr />
                </h1>

            </div>
            <div className="collections">

                {new_collections.map((item, index) =>
                    <Item key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                )}
            </div>
        </div >
    )
}

export { NewCollection }