import React, { useEffect, useState } from "react";
import { ShopContext } from "./ShopContext";
import all_products from '../../Components/Assets/all_product'

const ShopState = (props) => {

    const getDefualtCart = () => {
        let cart = {};
        for (let i = 0; i < all_products.length; i++) {
            cart[i] = 0;
        }
        return cart;
    }

    const [cartItem, setcart] = useState(getDefualtCart());

    const addTocart = async (id) => {

        const itemadded = await fetch('http://localhost:5000/addtocart', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-type': 'application/json',
                'auth-token': `${localStorage.getItem('auth-token')}`
            },
            body: JSON.stringify({ "id": id })
        }).then((response) => {
            if (!response) {
                return response.status(401).json({ msg: "Not able to post cart item" })
            }
            return response.json();
        }).then((data) => {
            console.log(data.error)

            //if sucessfuly updtaed in database then add to cart in front end else not
            if (data.error) {
                alert('Please Login / Signup to add data to cart')
            }
            else {
                const newCartItem = { ...cartItem };
                newCartItem[id] = cartItem[id] + 1;
                setcart(newCartItem);
            }

        }).catch((err) => {
            console.log(err)
        })

    }

    const removeFromcart = async (id) => {
        const itemadded = await fetch('http://localhost:5000/deletecartitem', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-type': 'application/json',
                'auth-token': `${localStorage.getItem('auth-token')}`
            },
            body: JSON.stringify({ "id": id })
        }).then((response) => {
            if (!response) {
                return response.status(401).json({ msg: "Not able to post cart item" })
            }
            return response.json();
        }).then((data) => {
            console.log(data.error)

            //if sucessfuly updtaed in database then add to cart in front end else not
            if (data.error) {
                alert('Please Login / Signup to add data to cart')
            }
            else {
                const newCartItem = { ...cartItem };
                newCartItem[id] = cartItem[id] - 1;
                setcart(newCartItem);
            }

        }).catch((err) => {
            console.log(err)
        })

    }

    const totalCost = () => {
        let total = 0;
        {
            all_products.map((val, index) => {
                if (cartItem[val.id] > 0) {
                    total = total + cartItem[val.id] * val.new_price
                }
            })
        }
        return total;
    }

    const totalproducts = () => {
        let total = 0;
        {
            all_products.map((val, index) => {
                if (cartItem[val.id] > 0) {
                    total = total + cartItem[val.id]
                }
            })
        }
        return total;
    }


    useEffect(() => {
        console.log(cartItem, 2)
    }, [cartItem])

    return (
        <ShopContext.Provider value={{ all_products, cartItem, addTocart, removeFromcart, totalCost, totalproducts }}>
            {props.children}
        </ShopContext.Provider>
    )



}

export default ShopState