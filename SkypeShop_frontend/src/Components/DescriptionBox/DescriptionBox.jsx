import React from 'react'
import '../DescriptionBox/DescriptionBox.css'
const DescriptionBox = () => {
    return (
        <div>
            <div className="description_individual_product">

                <div className="desc_info">
                    <div className="description-head">
                        <b>Description</b>
                    </div>
                    <div className="reviews-head">
                        <b style={{ color: 'grey' }}>Reviews(122)</b>
                    </div>
                </div>



                <div className="description-final">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in odio ultricies, fringilla nisi sed, pharetra metus. Maecenas ultrices velit id lectus scelerisque posuere. Vestibulum volutpat enim ac justo lacinia, id euismod nunc molestie. Nam faucibus ipsum ut ante accumsan, non faucibus dolor fermentum. Ut nec magna id mi pellentesque volutpat. Duis quis enim suscipit, vestibulum ligula vel, efficitur metus. Donec vestibulum tortor nec nibh dapibus, et elementum urna commodo.
                    <br />
                    <br />
                    Curabitur fermentum risus ut sollicitudin suscipit. Phasellus tristique, elit non eleifend viverra, sapien risus laoreet leo, non fringilla sem metus a odio. Quisque laoreet augue ac turpis tempus mollis. Suspendisse potenti. In hac habitasse platea dictumst. Nulla facilisi. Sed at nisi et lorem eleifend finibus.

                </div>
            </div>
        </div>
    )
}

export default DescriptionBox