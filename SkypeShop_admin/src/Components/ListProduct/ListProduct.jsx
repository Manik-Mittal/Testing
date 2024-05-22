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

    const deleteproduct = async (id) => {
        let obj = {
            id: 0
        };
        obj.id = id;

        await fetch('http://localhost:5000/removeproduct', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Cant delete product')
            }
            return response.json();
        }).then((data) => {
            console.log(data)
            allproducts()
            alert(data.msg)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        console.log("me2")
        allproducts()
    }, [])

    console.log("me3")
    console.log(Products, 1)

    return (
        <div className='listproduct'>
            <h1>All Product Lists</h1>

            <div className="prodlist">
                <p> Product</p>
                <p> Title</p>
                <p> Old price</p>
                <p> New Price</p>
                <p> Category</p>
                <p> Remove</p>
            </div>
            <hr></hr>

            {Products.map((product, index) => {
                return <div key={index} className="prodlist">
                    <div className="lpimg1">
                        <img src={product.image} alt='' />
                    </div>

                    <p>{product.name}</p>
                    <p>{product.old_price}</p>
                    <p>{product.new_price}</p>
                    <p>{product.category}</p>

                    <div className="lpimg2">
                        <img src={cross} alt='' onClick={() => { deleteproduct(product.id) }} />
                    </div>

                </div>

            })}


        </div>
    )
}

export default ListProduct