import React from 'react'
import '../Pages/CSS/Product.css'
import { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext/ShopContext'
import { useParams } from 'react-router-dom';
import BreadCrum from '../Components/BreadCrum/BreadCrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import { NewCollection } from '../Components/New Collection/NewCollection';

const Product = () => {
    const { all_products } = useContext(ShopContext)
    const { id } = useParams();
    const product_fetch = all_products.find((prod) => prod.id === Number(id));
    return (
        <div className='individual_product'>
            <BreadCrum name={product_fetch.name} />
            <ProductDisplay id={product_fetch.id} name={product_fetch.name} image={product_fetch.image} new_price={product_fetch.new_price} old_price={product_fetch.old_price} />
            <DescriptionBox />
            <NewCollection />
        </div>
    )
}

export { Product }