import React, { useState, useEffect } from 'react';
import './ListProduct.css';
import cross from '../../assets/cross_icon.png';
import Sidebar from '../Sidebar/Sidebar';

const ListProduct = () => {
    const [Products, setproducts] = useState([]);
    const [email, setemail] = useState("")
    console.log(Products)

    let mail;
    const getuserandinventory = async () => {
        try {
            // Fetch user data

            const userResponse = await fetch('http://localhost:5000/getadmin', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`
                }
            }).then((userResponse) => {
                if (!userResponse.ok) {
                    throw new Error('Unable to fetch data');
                }
                return userResponse.json()
            }).then((data) => {
                mail = data;
                setemail(data)
            }).catch((err) => {
                console.log(err)
            })


            //fetch product data of above user
            const productResponse = await fetch('http://localhost:5000/getadminproducts', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: mail })
            });

            if (!productResponse.ok) {
                throw new Error('Failed to get admin products');
            }

            const productData = await productResponse.json();
            setproducts(productData.msg); //works async so product is filled after some time
        } catch (err) {
            console.log(err);
        }
    };

    //console.log(userResponse)

    const deleteproduct = async (image) => {

        try {
            const response = await fetch('http://localhost:5000/removeproduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image: image })
            });

            if (!response.ok) {
                throw new Error('Cannot delete product');
            }

            const data = await response.json();
            console.log(data);
            alert(data.msg);
        } catch (err) {
            console.log(err);
        }

        try {

            const response = await fetch('http://localhost:5000/RemoveProductFromAdmincart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    image: image,
                    email: email
                })
            });

            if (!response.ok) {
                throw new Error('Cannot delete product');
            }

            const data = await response.json();
            console.log(data);
            getuserandinventory(); // Refetch the products after deletion
            alert(data.msg);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (!localStorage.getItem('auth-token')) {
            alert('Please login or signup first');
            window.location = "/";
        }
        getuserandinventory();
    }, []);

    return (
        <div className="main-container">
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className='listproduct'>
                <h1>All Product Lists</h1>
                <div className="prodlist">
                    <p>Product</p>
                    <p>Title</p>
                    <p>Old price</p>
                    <p>New Price</p>
                    <p>Category</p>
                    <p>Remove</p>
                </div>
                <hr />
                {Products.map((product, index) => (
                    <div key={index} className="prodlist">
                        <div className="lpimg1">
                            <img src={product.image} alt='' />
                        </div>
                        <p>{product.name}</p>
                        <p>{product.old_price}</p>
                        <p>{product.new_price}</p>
                        <p>{product.category}</p>
                        <div className="lpimg2">
                            <img src={cross} alt='' onClick={() => { deleteproduct(product.image) }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListProduct;
