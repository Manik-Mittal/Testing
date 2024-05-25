import React, { useEffect, useState } from "react";
import { ShopContext } from "./ShopContext";
import all_products from '../../Components/Assets/all_product'

const ShopState = (props) => {

    const fetchallproducts = async () => {
        await fetch('https://skypeshop.onrender.com').then((response) => {
            if (!response) {
                throw new Error('Failed to fetch newcollection');
            }
            return response.json();
        }).then((data) => {
            let newprods = { ...products };
            newprods = data
            setproducts(data.products)
            console.log(products)
        }).catch((err) => {
            console.log(err)
        })
    }

    const getcart = async (token) => {
        console.log(token)
        await fetch('https://skypeshop.onrender.com/getcartitems', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-type': 'application/json',
                'auth-token': `${localStorage.getItem('auth-token')}`
            }
        }).then((response) => {
            if (!response) {
                throw Error("Unable to fetch cart")
            }
            return response.json()
        }).then((data) => {
            console.log(data)
            setcart(data);
        }).catch((err) => {
            console.log(err)
        })

    }

    const getDefualtCart = () => {
        let cart = {}
        if (localStorage.getItem('auth-token')) {
            getcart(localStorage.getItem('auth-token'));
        }
        else {
            for (let i = 0; i < all_products.length; i++) {
                cart[i] = 0;
            }
            setcart(cart)
        }
    }


    const [products, setproducts] = useState([])
    const [cartItem, setcart] = useState({});

    console.log(cartItem)
    const addTocart = async (id) => {

        const itemadded = await fetch('https://skypeshop.onrender.com/addtocart', {
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
                alert('Successfully Added in Cart')
            }

        }).catch((err) => {
            console.log(err)
        })

    }

    const removeFromcart = async (id) => {
        const itemadded = await fetch('https://skypeshop.onrender.com/deletecartitem', {
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
        getDefualtCart();
        fetchallproducts();
    }, [])

    return (
        <ShopContext.Provider value={{ products, cartItem, addTocart, removeFromcart, totalCost, totalproducts }}>
            {props.children}
        </ShopContext.Provider>
    )



}

export default ShopState