import React from 'react';
import './BuyerVerProductDetail.css';
import Header from '../Header/Header';
import Slider from "react-slick";  // Importing the Slider component

function BuyerVerProductDetail() {

    // Event handler function for copying the hyperlink
    const copyLinkHandler = () => {
        // This will copy the current page's URL to the clipboard
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                alert('The link for this product is copied to clipboard!'); // A feedback for the user
            })
            .catch(err => {
                console.error('Error copying text: ', err);
            });
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className="product-detail-container"> 
            <Header />
            
            <div className="product-detail-content">
                <div className="item-picture">
                    <div className="status-section">
                        <span>Status: Sold</span>
                    </div>
                    {/* Carousel Component */}
                    <Slider {...settings}>
                        <div className="each-pic">
                            <img src="https://picsum.photos/200/300?random=1" alt="Item 1"/>
                        </div>
                        <div className="each-pic">
                            <img src="https://picsum.photos/200/300?random=2" alt="Item 2"/>
                        </div>
                        <div className="each-pic">
                            <img src="https://picsum.photos/200/300?random=3" alt="Item 3"/>
                        </div>
                        <div className="each-pic">
                            <img src="https://picsum.photos/200/300?random=4" alt="Item 4"/>
                        </div>
                    </Slider>
                </div>
                <div className="product-info">
                    <p><strong>Price:</strong> $23.99</p>
                    <p><strong>Category:</strong> Zibaroo</p>
                    <p><strong>Condition:</strong> Used</p>
                    <p><strong>Seller Contact Info:</strong> (+1) 123-456-7890</p>
                    <p><strong>Description:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed 
                    vehicula mauris id magna varius, vitae vestibulum tortor pulvinar. Fusce euismod sollicitudin ante,
                    nec tincidunt orci finibus at. Quisque pharetra, augue vel aliquam fermentum, justo sapien facilisis
                    nulla, non euismod purus lorem eu est. Vestibulum ante ipsum primis in faucibus orci luctus et 
                    ultrices posuere cubilia curae; Nullam ultrices velit sit amet est ultricies, ac blandit turpis 
                    tincidunt.</p>
                </div>
                <div className="button-container">
                    <button className="copy-link-button" onClick={copyLinkHandler}>Copy Link</button>
                </div>
            </div>
        </div>      
        
    );
}

export default BuyerVerProductDetail;
