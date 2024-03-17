import React, { useState, useEffect } from 'react'
import './ListProduct.css'
import cross from '../../assets/cross_icon.png'
const ListProduct = () => {

    const [Products, setproducts] = useState([]);
    console.log("me1")
    const allproducts = async () => {
        await fetch('http://localhost:5000').then((response) => {
            if (!response.ok) throw new Error('Failed to upload image');
            return response.json();
        }).then((data) => {
            console.log(data)
            setproducts(data.products)
        }).catch((err) => console.log(err))
    }

    useEffect(() => {
        console.log("me2")
        allproducts()
    }, [])

    console.log("me3")
    console.log(Products, 1)
    //allproducts()

    return (
        <div className='listproduct'>
            <h1>All Product Lists</h1>
            <p> Product</p>
            <p> Title</p>
            <p> Old price</p>
            <p> New Price</p>
            <p> Category</p>
            <p> Remove</p>

            <hr></hr>

            {Products.map((product, index) => (
                <div key={index} className="prodlist">
                    <img src={product.image} alt='' />
                    <p>{product.name}</p>
                    <p>{product.old_price}</p>
                    <p>{product.new_price}</p>
                    <p>{product.category}</p>
                    <img src={cross} alt='' />
                </div>
            ))}


        </div>
    )
}

export default ListProduct