import React from 'react'
import './Sidebar.css'
import productcart from '../../assets/Product_Cart.svg'
import productlist from '../../assets/Product_list_icon.svg'
import { Link } from 'react-router-dom'
const Sidebar = () => {
    return (
        <div className='sidebar'>

            <div className="conatiner-sidebar">

                <div className="addprod">

                    <Link to='/addproduct' style={{ textDecoration: 'none' }}>
                        <div className="adds">
                            <img src={productcart}></img>
                            <p>Add Product</p>
                        </div>
                    </Link>
                </div>
                <div className="prodlist">
                    <Link to='/listproduct' style={{ textDecoration: 'none' }}>
                        <div className="list">
                            <img src={productlist}></img>
                            <p>Product List</p>
                        </div>
                    </Link>
                </div>
                <div className="prodlist">
                    <Link to='/live' style={{ textDecoration: 'none' }}>
                        <div className="list2">
                            <img src={productlist}></img>
                            <p>Go Live</p>
                        </div>
                    </Link>
                </div>
                <div className="prodlist">
                    <Link to='/createappointment' style={{ textDecoration: 'none' }}>
                        <div className="list2">
                            <img src={productlist}></img>
                            <p>Create Appointment Schedule</p>
                        </div>
                    </Link>
                </div>




            </div>

        </div>
    )
}

export default Sidebar