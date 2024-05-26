import React, { useState } from 'react'
import './AddProduct.css'
import upload from '../../assets/upload_area.svg'
import Sidebar from '../Sidebar/Sidebar';
const AddProduct = () => {
    const [image, setimage] = useState(false);

    const [productdetails, setproductdetails] = useState(
        {
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
    const categoryhandler = (category) => {
        let newprod = productdetails;
        newprod.category = category

        setproductdetails(newprod);
        console.log(productdetails.category)

    };

    const buthandler = async () => {

        let resdata;
        let formData = new FormData()
        formData.append('product', image)

        await fetch('http://localhost:5000/upload', {
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

        productdetails.image = resdata.image_url;  //will execute only after response from server is received
        console.log(productdetails);

        await fetch('http://localhost:5000/addproduct', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productdetails)
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Failed to add product');
            }
            return response.json();
        }).then((data) => {
            if (data) alert('Item added successfully')
        })
    }



    return (

        <div className="main-container">
            <div className="sidebar">
                <Sidebar></Sidebar>
            </div>
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
                        {productdetails.category == "men" ? <button className='catbutselect' onClick={() => categoryhandler("men")}><span>Men</span></button> : <button className='catbut' onClick={() => categoryhandler("men")}><span>Men</span></button>}
                        {productdetails.category == "women" ? <button className='catbutselect' onClick={() => categoryhandler("women")}><span>Women</span></button> : <button className='catbut' onClick={() => categoryhandler("women")}><span>Women</span></button>}
                        {productdetails.category == "kids" ? <button className='catbutselect' onClick={() => categoryhandler("kids")}><span>Kids</span></button> : <button className='catbut' onClick={() => categoryhandler("kids")}><span>Kids</span></button>}

                    </div>

                    <div className="imgupload">
                        <label for='imagefile'>
                            <img src={uploadedimg} alt='srry' className='uploadedimg'></img>
                        </label>
                        <input type='file' name='product' id='imagefile' hidden onChange={imagehandler}></input>
                    </div>


                    <div className="prodbutton">
                        <button onClick={() => { buthandler() }}>Add product</button>
                    </div>
                </div>



            </div >
        </div>

    )
}

export default AddProduct