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

    const addTocart = (id) => {
        setcart((prev) => { return { ...prev, [id]: prev[id] + 1 } });
    }

    const removeFromcart = (id) => {
        setcart((prev) => {
            return { ...prev, [id]: prev[id] - 1 }
        });

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
        console.log(cartItem)
    }, [cartItem])

    return (
        <ShopContext.Provider value={{ all_products, cartItem, addTocart, removeFromcart, totalCost, totalproducts }}>
            {props.children}
        </ShopContext.Provider>
    )



}

export default ShopState