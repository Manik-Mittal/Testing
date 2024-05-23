import React from 'react'
import '../Pages/CSS/Product.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BreadCrum from '../Components/BreadCrum/BreadCrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import { NewCollection } from '../Components/New Collection/NewCollection';

const Product = () => {


    const [product_fetch, setproduct_fetch] = useState({});
    console.log(product_fetch);
    const { id } = useParams();
    const fetchallproducts = async () => {
        console.log(1)
        await fetch('http://localhost:5000').then((response) => {
            if (!response) {
                throw new Error('Failed to fetch newcollection');
            }
            return response.json();
        }).then((data) => {
            let newprods = data.products
            console.log(newprods)
            let temp = newprods.find((prod) => prod.id == Number(id));
            // console.log(temp)
            setproduct_fetch(temp)
            //console.log(product_fetch)

        }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        fetchallproducts();
    }, [])




    // console.log(product_fetch.name)
    return (
        <>
            {product_fetch ?
                <div className='individual_product'>
                    <BreadCrum name={product_fetch.name} />
                    <ProductDisplay id={product_fetch.id} name={product_fetch.name} image={product_fetch.image} new_price={product_fetch.new_price} old_price={product_fetch.old_price} />
                    <DescriptionBox />
                    <NewCollection />
                </div>
                :
                <div>
                    <p>h</p>
                </div>

            }
        </>


    )
}

export { Product }