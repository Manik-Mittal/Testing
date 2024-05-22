import React, { useState } from 'react'
import './AddProduct.css'
import upload from '../../assets/upload_area.svg'
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
    const handlecat = (e) => {
        setproductdetails({ ...productdetails, category: e.target.value });
    }

    const buthandler = async () => {

        let resdata;
        let formData = new FormData()
        formData.append('product', image)

        // let obj = {}
        // for (const [key, value] of formData.entries()) {
        //     obj[key] = value;
        // }

        // console.log(obj)


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
                    <button onClick={() => { buthandler() }}>Add product</button>
                </div>
            </div>



        </div >
    )
}

export default AddProduct