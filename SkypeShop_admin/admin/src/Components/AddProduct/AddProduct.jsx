import React, { useState } from 'react'
import './AddProduct.css'
import upload from '../../assets/upload_area.svg'
const AddProduct = () => {
    const [image, setimage] = useState(false);
    const imagehandler = (e) => {
        setimage(e.target.files[0])
    }
    let uploadedimg = null;
    if (image) {
        uploadedimg = URL.createObjectURL(image);
    }
    else {
        uploadedimg = upload;
    }

    return (
        <div className='addproduct'>

            <div className="container">
                <div className="title">
                    <p>Product Name</p>
                    <input type='text' name='name' placeholder='Enter Product name'></input>
                </div>

                <div className="price">
                    <div className="ptitle1">
                        <p>Old Price</p>
                        <input type='text' name='old_price' placeholder='Enter Product Price'></input>
                    </div>
                    <div className="ptitle2">
                        <p>New Price</p>
                        <input type='text' name='new_price' placeholder='Enter Product Offer Price'></input>
                    </div>
                </div>



                <div className="prodcat">
                    <p>Product Category</p>
                    <select name="category">
                        <option value="women">Women</option>
                        <option value="men ">Men</option>
                        <option value="kids">Kids</option>
                    </select>
                </div>

                <div className="imgupload">
                    <label for='imagefile'>
                        <img src={uploadedimg} alt='srry' className='uploadedimg'></img>
                    </label>
                    <input type='file' name='image' id='imagefile' hidden onChange={imagehandler}></input>
                </div>
                <div className="prodbutton">
                    <button>Add product</button>
                </div>
            </div>



        </div >
    )
}

export default AddProduct