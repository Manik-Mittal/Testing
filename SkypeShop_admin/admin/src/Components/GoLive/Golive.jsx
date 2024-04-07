import React from 'react'
import { useState } from 'react';
import './GoLive.css'
import upload from '../../assets/upload_area.svg'
const Golive = () => {
    const [image, setimage] = useState(false);
    const [productdetails, setproductdetails] = useState(
        {
            name: "",
            old_price: 0,
            new_price: 0,
            category: "",
            image: "",

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
    return (

        <div className='addproduct'>

            <div className="container">
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
                <div className="prodbutton">
                    <button >Create Room</button>
                </div>

                <div className="title">
                    <p>Live Stream URL</p>
                    <input type='text' name='name' placeholder='Enter Product name' onChange={handlename}></input>
                </div>

                <div className="prodbutton">
                    <button >Post Live</button>
                </div>
            </div>



        </div >

    )
}

export default Golive
