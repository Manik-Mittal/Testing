import React, { useEffect, useState } from 'react';
import '../ProductDisplay/ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext/ShopContext';
import CalendarAppointment from '../../Pages/Calender';

const ProductDisplay = (props) => {
    const [url, setUrl] = useState('');

    const { addTocart } = useContext(ShopContext);
    const helper = (id) => {
        addTocart(id);
    }

    const fetchAdminImageBases = async () => {
        try {
            const response = await fetch('http://localhost:5500/getadminimagebases', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: props.image })
            });
            if (!response.ok) {
                throw new Error('Failed to get admin image bases');
            }
            const data = await response.json();
            setUrl(data.response.url);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchAdminImageBases();
    }, [props.image]);

    return (
        <div className='productdisplay'>
            <div className="pdleft">
                <div className="minor">
                    <img src={props.image} alt="Product Thumbnail" />
                    <img src={props.image} alt="Product Thumbnail" />
                    <img src={props.image} alt="Product Thumbnail" />
                    <img src={props.image} alt="Product Thumbnail" />
                </div>
                <div className="major">
                    <img src={props.image} alt="Product" />
                </div>
            </div>
            <div className="pdright">
                <h1>{props.name}</h1>

                <div className="pdright_info">
                    <div className="stars">
                        <img src={star_icon} alt="Star Icon" />
                        <img src={star_icon} alt="Star Icon" />
                        <img src={star_icon} alt="Star Icon" />
                        <img src={star_icon} alt="Star Icon" />
                        <img src={star_dull_icon} alt="Dull Star Icon" />
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

                    <br />
                    <br />

                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam in odio ultricies, fringilla nisi sed, pharetra metus.
                    Maecenas ultrices velit id lectus scelerisque posuere.
                    Vestibulum volutpat enim ac justo lacinia, id euismod nunc molestie.
                    Nam faucibus ipsum ut ante accumsan, non faucibus dolor fermentum.
                </div>
                <div className="size_descirption">
                    <button onClick={() => helper(props.id)}>Add To Cart</button>
                    {url && <CalendarAppointment urlfrombackend={url} />}
                    <p><b>Category:</b> Women, Tshirt, Crop Top</p>
                    <p><b>Tags:</b> Modern, Latest</p>
                </div>
            </div>
        </div>
    );
}

export default ProductDisplay;
