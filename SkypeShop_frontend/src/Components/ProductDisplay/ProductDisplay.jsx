import React from 'react'
import '../ProductDisplay/ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext/ShopContext'

const ProductDisplay = (props) => {
    const { addTocart } = useContext(ShopContext);
    const helper = (id) => {
        alert('Successfully Added in Cart')
        addTocart(id)
    }
    // console.log(useContext(ShopContext, 1));
    return (
        <div className='productdisplay'>
            <div className="pdleft">
                <div className="minor">
                    <img src={props.image}></img>
                    <img src={props.image}></img>
                    <img src={props.image}></img>
                    <img src={props.image}></img>
                </div>
                <div className="major">
                    <img src={props.image}></img>
                </div>
            </div>
            <div className="pdright">
                <h1>{props.name}</h1>

                <div className="pdright_info">
                    <div className="stars">
                        <img src={star_icon}></img>
                        <img src={star_icon}></img>
                        <img src={star_icon}></img>
                        <img src={star_icon}></img>
                        <img src={star_dull_icon}></img>
                    </div>
                    <p>(122)</p>
                </div>



                <div className="product_display_price">
                    <p className='oldp'>${props.old_price}</p>
                    <p className='newp'>${props.new_price}</p>
                </div>

                <div className="description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam in odio ultricies, fringilla nisi sed, pharetra metus.
                    Maecenas ultrices velit id lectus scelerisque posuere.
                    Vestibulum volutpat enim ac justo lacinia, id euismod nunc molestie.
                    Nam faucibus ipsum ut ante accumsan, non faucibus dolor fermentum.
                    Ut nec magna id mi pellentesque volutpat. Duis quis enim suscipit, vestibulum ligula vel, efficitur metus.
                </div>
                <div className="size_descirption">
                    <h2>Select size</h2>
                    <div className="size">
                        <div className="x">X</div>
                        <div className="x">Xl</div>
                        <div className="x">XXL</div>
                        <div className="x">S</div>
                        <div className="x">M</div>
                        <div className="x">L</div>
                    </div>
                    <button onClick={() => { helper(props.id) }}>Add To Cart</button>
                    <p><b>Category:</b>  Women,Tshirt,Crop Top</p>
                    <p><b>Tags:</b>   Modern ,Latest</p>



                </div>
            </div>
        </div>
    )
}

export default ProductDisplay