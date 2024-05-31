import React, { useContext, useState } from 'react'
import '../Pages/CSS/ShopCategory.css'
import { Item } from '../Components/Item/Item'
import { useEffect } from 'react'
import { Oval } from 'react-loader-spinner'

const ShopCategory = (props) => {  //getting props from app.js

    const [products, setproducts] = useState([]);
    console.log(products)
    const fetchallproducts = async () => {
        await fetch('https://skypeshop.onrender.com').then((response) => {
            if (!response) {
                throw new Error('Failed to fetch newcollection');
            }
            return response.json();
        }).then((data) => {
            let newprods = { ...products };
            newprods = data
            setproducts(data.products)
            console.log(products)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetchallproducts();
    }, [])

    // const { all_products } = useContext(ShopContext)

    return (
        <div className='shopcat'>

            <div className='banimg'>
                <img src={props.banner} alt='' ></img>
            </div>

            <div className="prods">
                {products.length == 0 ? <div className="loader"><Oval
                    height={80}
                    width={80}
                    radius={9}
                    color="green"
                    ariaLabel="loading"
                    wrapperStyle={{}}
                    wrapperClass={{}}
                /></div> : products.map((val, index) => {
                    if (val.category == props.category) {
                        return <Item key={index} id={val.id} name={val.name} image={val.image} new_price={val.new_price} old_price={val.old_price} />
                    }
                })}

            </div>

        </div>
    )
}

export { ShopCategory }