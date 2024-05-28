import React from 'react'
import './NewCollection.css'
import { useEffect } from 'react'
import new_collections from '../Assets/new_collections'
import { Item } from '../Item/Item'
import { useState } from 'react'
import { Oval } from 'react-loader-spinner'
const NewCollection = () => {

    const [nc, setnc] = useState([]);

    const bringnewcollection = async () => {
        await fetch('https://skypeshop.onrender.com/newcollections').then((response) => {
            if (!response.ok) {

                throw new Error('Failed to fetch newcollection');
            }
            return response.json()
        }).then((data) => {
            console.log(data);
            setnc(data.mycollection)
        }).catch((err) => {
            console.log(err)
            alert('Kindly wait few minutes for server to get activated ')
        })
    }
    useEffect(() => {
        bringnewcollection()
    }, [])

    return (
        <div className='pops'>
            <div className='popular'>
                <h1>New Collections
                    <hr />
                </h1>

            </div>

            <div className="collections">
                {nc.length == 0 ?
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
                    nc.map((item, index) =>
                        <Item key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                    )}


                {/* {nc.map((item, index) =>
                    <Item key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                )} */}
            </div>
        </div >
    )
}

export { NewCollection }

