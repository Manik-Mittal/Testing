import React from 'react'
import './CartItem.css'
import { ShopContext } from '../../Context/ShopContext/ShopContext'
import { useContext } from 'react'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItem = () => {
    const { all_products, cartItem, addTocart, removeFromcart, totalCost } = useContext(ShopContext)

    return (
        <div className='cartitem'>

            <div className="header">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>

            </div>
            <hr />

            {all_products.map((val, index) => {
                if (cartItem[val.id] > 0) {
                    return <div>
                        <div className='item-desc'>
                            <div className="cart-item">
                                <img src={val.image} alt=''></img>
                            </div>

                            <p className='title'>{val.name}</p>


                            <p>{val.new_price}</p>
                            <p>{cartItem[val.id]}</p>
                            <p>{val.new_price * cartItem[val.id]}</p>



                            <div className="remove">
                                <img src={remove_icon} onClick={() => { removeFromcart(val.id) }}></img>
                            </div>


                        </div>
                        <hr></hr>
                    </div>
                }
                else {
                    return <></>
                }
            })}
            <h2>Cart Total</h2>
            <div className="cart-total">
                <div className="cart-total-left">
                    <div className="subtotal">
                        <p>Subtotal:</p>
                        <p>${totalCost()}</p>
                    </div>
                    <hr />
                    <div className="shipping">
                        <p>shipping fee:</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="total-amount">
                        <p><b>Total</b></p>
                        <p><b>${totalCost()}</b></p>
                    </div>
                    <div className="payment">
                        <button>Proceed to Payment</button>
                    </div>
                </div>
                <div className="cart-total-right">
                    <p>If you have any promo code enter it here</p>
                    <input placeholder='promo code' name='total'></input>
                    <button>Submit</button>
                </div>
            </div>
        </div >


    )
}

export default CartItem