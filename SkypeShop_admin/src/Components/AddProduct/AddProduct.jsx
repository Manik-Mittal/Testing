import React, { useEffect, useState } from 'react';
import './AddProduct.css';
import upload from '../../assets/upload_area.svg';
import Sidebar from '../Sidebar/Sidebar';

const AddProduct = () => {

    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        email: "",
        name: "",
        old_price: 0,
        new_price: 0,
        category: "",
        image: "",
        op1: "",
        op2: "",
        op3: "",
        op4: "",
        op5: "",
    });

    const getuser = async () => {

        await fetch('https://skypeshop.onrender.com/getadmin', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'auth-token': `${localStorage.getItem('auth-token')}`
            },

        }).then((response) => {
            if (!response.ok) {
                throw error('Unable to fetch data')
            }
            return response.json()
        }).then((data) => {
            setProductDetails({ ...productDetails, email: data })
        }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        console.log("AddProduct component mounted");
        if (!localStorage.getItem('auth-token')) {
            alert('Please login or signup first');
            window.location = "/";
        }
        getuser();
    }, []);

    const imageHandler = (e) => {
        console.log(e.target.files[0]);
        setImage(e.target.files[0]);
    };

    let uploadedImg = image ? URL.createObjectURL(image) : upload;

    const handleNameChange = (e) => {
        setProductDetails({ ...productDetails, name: e.target.value });
    };

    const handlePriceChange = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (category) => {
        setProductDetails(prevDetails => ({
            ...prevDetails,
            category: category
        }));
    };

    const handleAddProduct = async () => {
        let resData;
        let formData = new FormData();
        formData.append('product', image);

        await fetch('https://skypeshop.onrender.com/upload', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to upload image');
                }
                return response.json();
            })
            .then(data => resData = data)
            .catch(err => console.log(err));

        productDetails.image = resData.image_url;
        console.log(productDetails);

        await fetch('https://skypeshop.onrender.com/addproduct', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productDetails)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add product');
                }
                return response.json();
            })
            .then(data => {
                if (data) alert('Item added successfully to Website');
            });


        await fetch('https://skypeshop.onrender.com/admincart', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productDetails)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add product');
                }
                return response.json();
            })
            .then(data => {
                if (data) alert('Item added successfully to your inventory');
            });
    };

    return (
        <div className="main-container">
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className='addproduct'>
                <div className="container">
                    <div className="title">
                        <p>Product Name</p>
                        <input
                            type='text'
                            name='name'
                            placeholder='Enter Product name'
                            onChange={handleNameChange}
                        />
                    </div>
                    <div className="price">
                        <div className="ptitle1">
                            <p>Old Price</p>
                            <input
                                type='text'
                                name='old_price'
                                placeholder='Enter Product Price'
                                onChange={handlePriceChange}
                            />
                        </div>
                        <div className="ptitle2">
                            <p>New Price</p>
                            <input
                                type='text'
                                name='new_price'
                                placeholder='Enter Product Offer Price'
                                onChange={handlePriceChange}
                            />
                        </div>
                    </div>
                    <div className="prodcat">
                        <p>Product Category</p>
                        <button
                            className={productDetails.category === "men" ? 'catbutselect' : 'catbut'}
                            onClick={() => handleCategoryChange("men")}
                        >
                            <span>Men</span>
                        </button>
                        <button
                            className={productDetails.category === "women" ? 'catbutselect' : 'catbut'}
                            onClick={() => handleCategoryChange("women")}
                        >
                            <span>Women</span>
                        </button>
                        <button
                            className={productDetails.category === "kids" ? 'catbutselect' : 'catbut'}
                            onClick={() => handleCategoryChange("kids")}
                        >
                            <span>Kids</span>
                        </button>
                    </div>
                    <div className="imgupload">
                        <label htmlFor='imagefile'>
                            <img src={uploadedImg} alt='srry' className='uploadedimg' />
                        </label>
                        <input
                            type='file'
                            name='product'
                            id='imagefile'
                            hidden
                            onChange={imageHandler}
                        />
                    </div>
                    <div className="prodbutton">
                        <button onClick={handleAddProduct}>Add product</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;

