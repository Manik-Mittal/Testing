import React from 'react'
import { useState } from 'react';
import './GoLive.css'
import upload from '../../assets/upload_area.svg'
import Sidebar from '../Sidebar/Sidebar';
import { useEffect } from 'react';
const Golive = () => {
    const [image, setimage] = useState(false);
    const [productdetails, setproductdetails] = useState(
        {
            name: "",
            old_price: 0,
            new_price: 0,
            category: "",
            image: "",
            url: "",
            op1: "",
            op2: "",
            op3: "",
            op4: "",
            op5: ""

        }
    )

    const imagehandler = (e) => {
        console.log(e.target.files[0]);
        setimage(e.target.files[0])
    }
    let uploadedimg = null;
    let image_to_server;

    if (image) {
        image_to_server = uploadedimg
        uploadedimg = URL.createObjectURL(image);
    }
    else {
        uploadedimg = upload;
    }


    const postlive = async () => {
        let resdata;
        let formData = new FormData()
        formData.append('product', image)

        await fetch('https://skypeshop.onrender.com/upload', {
            method: 'POST',
            body: formData

        }).then(respnse => {
            if (!respnse.ok) {
                throw new Error('Failed to upload image');
            }
            return respnse.json();
        })
            .then(data => console.log(resdata = data))
            .catch(err => console.log(err))

        productdetails.image = resdata.image_url;

        let id;

        await fetch('https://skypeshop.onrender.com/postlive', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(productdetails)
        }).then((response) => {
            if (!response.ok) {
                throw new error("Failed to upload Live")
            }
            return response.json(response)
        }).then((data) => {
            console.log(data);
            id = data.streams._id;
            alert('LiveSuccessfully Posted')
        }).catch((err) => {
            console.log(err)
        })


        //initalizing the count of options as zero in database

        let options = {
            prodid: id
        }
        for (let i = 1; i <= 5; i++)options[i] = 0;
        console.log(options)

        await fetch('https://skypeshop.onrender.com/polloptions', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(options)
        }).then((response) => {
            if (!response.ok) {
                throw new error("Failed to upload Live")
            }
            return response.json(response)
        }).then((data) => {
            console.log(data);
        }).catch((err) => {
            console.log(err)
        })

    }
    const handlename = (e) => {
        setproductdetails({ ...productdetails, name: e.target.value });
    }
    const handleop = (e) => {
        setproductdetails({ ...productdetails, [e.target.name]: e.target.value });
    }
    const handlenp = (e) => {
        setproductdetails({ ...productdetails, new_price: e.target.value });
    }
    const handlecat = (e) => {
        setproductdetails({ ...productdetails, category: e.target.value });
    }
    const handleurl = (e) => {

        setproductdetails({ ...productdetails, url: e.target.value });
    }

    useEffect(() => {
        if (!localStorage.getItem('auth-token')) {
            alert('Please login or signup first')
            window.location = "/";
        }
    }, [])
    return (

        <div className="main-container">
            <div className="sidebar">
                <Sidebar></Sidebar>
            </div>
            <div className='addproduct'>

                <div className="container">

                    <div className="title">
                        <p>Paste URL of Live Stream by creating a room below</p>
                        <input type='text' name='url' placeholder='Enter Product name' onChange={handleurl}></input>
                    </div>

                    <div className="prodbutton">
                        <a href='https://skype-shop-admin-livestream.vercel.app/'><button>Create Room</button></a>
                    </div>


                    <div className="title">
                        <p>Product Name</p>
                        <input type='text' name='name' placeholder='Enter Product name' onChange={handlename}></input>
                    </div>



                    <div className="price">
                        <div className="ptitle1">
                            <p>Old Price</p>
                            <input type='text' name='old_price' placeholder='Enter Product Price' onChange={handleop}></input>
                        </div>
                        <div className="ptitle2">
                            <p>New Price</p>
                            <input type='text' name='new_price' placeholder='Enter Product Offer Price' onChange={handlenp}></input>
                        </div>
                    </div>



                    <div className="prodcat">
                        <p>Product Category</p>
                        <select name="category" value={productdetails.category} onChange={handlecat}>
                            <option value="women">Women</option>
                            <option value="men " >Men</option>
                            <option value="kids" >Kids</option>
                        </select>
                    </div>

                    <div className="imgupload">
                        <label for='imagefile'>
                            <img src={uploadedimg} alt='srry' className='uploadedimg'></img>
                        </label>
                        <input type='file' name='product' id='imagefile' hidden onChange={imagehandler}></input>
                    </div>


                    <div className="polltitles">
                        <p>Enter Options  For Poll</p>
                        <input type='text' name='op1' placeholder='Enter Product name' onChange={handleop} ></input>
                    </div>

                    <div className="polltitles">
                        <input type='text' name='op2' placeholder='Enter Product name' onChange={handleop}></input>
                    </div>

                    <div className="polltitles">
                        <input type='text' name='op3' placeholder='Enter Product name' onChange={handleop} ></input>
                    </div>

                    <div className="polltitles">
                        <input type='text' name='op4' placeholder='Enter Product name' onChange={handleop} ></input>
                    </div>


                    <div className="polltitles">
                        <input type='text' name='name' placeholder='Enter Product name' onChange={handleop}></input>
                    </div>






                    <div className="prodbutton">
                        <button onClick={() => { postlive() }}>Post Live</button>
                    </div>

                </div>



            </div >
        </div>


    )
}

export default Golive
