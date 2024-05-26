import React from 'react'
import './CartItem.css'
import { ShopContext } from '../../Context/ShopContext/ShopContext'
import { useContext } from 'react'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItem = () => {
    const { products, cartItem, addTocart, removeFromcart, totalCost } = useContext(ShopContext)


    const paymenthandler = async (e) => {
        let cost = totalCost();
        console.log(cost)
        if (cost < 500) {
            alert('Atleast 500 Payment')
            return;
        }
        console.log(typeof (cost))
        let orders;
        let order = {
            amount: String(cost),
            currency: "INR",
            receipt: "SkypeShop"
        }
        const response = await fetch('http://localhost:5000/order', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        }).then((response) => {
            if (!response.ok) {
                throw Error('Unable to post order details')
            }
            return response.json()
        }).then((data) => {
            console.log(data)
            orders = data;
        }).catch((err) => {
            console.log(err)
        })

        //api part of razor pay given to me 

        var options = {
            "key": "rzp_test_0UsndzeVUiKnEu", // Enter the Key ID generated from the Dashboard
            "amount": cost, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "SkypeShop",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orders.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response) {
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature)
            },
            "prefill": {
                "name": "Abhishek Shukla",
                "email": "abhi.shukla@gmail.com",
                "contact": "8595584781"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });
        rzp1.open();
        e.preventDefault();

    }
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

            {products.map((val, index) => {
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
                        <button onClick={paymenthandler}>Proceed to Payment</button>
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