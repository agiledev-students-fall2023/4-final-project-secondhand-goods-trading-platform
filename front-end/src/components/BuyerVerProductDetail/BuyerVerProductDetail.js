import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BuyerVerProductDetail.css';
import Header from '../Header/Header';
import Slider from "react-slick";
import { useParams } from 'react-router-dom';

import { getCategory } from '../Utils/Utils';

function BuyerVerProductDetail() {
    const { id } = useParams();

    const [itemDetails, setItemDetails] = useState(null);
    
    useEffect(() => {
        // Update the URL to backend endpoint
        axios.get(`/api/product-detail/${id}`).then(response => {
            setItemDetails(response.data);
        }).catch(error => {
            console.error('Error fetching product details:', error);
        });
    }, [id]);

    if (!itemDetails) return <div>Loading...</div>;

    const imageUrl = itemDetails.download_url;
    const author = itemDetails.author;
    const price = itemDetails.width;

    const authorHashValue = parseInt(author.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)) % 4 + 1;
    const conditions = ['Used', 'New', '90% New', '75% New'];

    const category = getCategory(author);
    const condition = conditions[authorHashValue - 1];

    // Event handler function for copying the hyperlink
    const copyLinkHandler = () => {
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
                    <Slider {...settings}>
                        <div className="each-pic">
                            <img src={imageUrl} alt="Item 1"/>
                        </div>
                        <div className="each-pic">
                            <img src={imageUrl || process.env.PUBLIC_URL + '/listing-placeholder.png'} alt="Item 2"/>
                        </div>
                        <div className="each-pic">
                            <img src={imageUrl || process.env.PUBLIC_URL + '/listing-placeholder.png'} alt="Item 3"/>
                        </div>
                        <div className="each-pic">
                            <img src={imageUrl || process.env.PUBLIC_URL + '/listing-placeholder.png'} alt="Item 4"/>
                        </div>
                    </Slider>

                </div>
                <div className="product-info">
                    <p><strong>Price:</strong> ${price}</p>
                    <p><strong>Category:</strong> {category === 'StudySupplies' ? 'Study Supplies' : category}</p>
                    <p><strong>Condition:</strong> {condition}</p>
                    <p><strong>Seller Contact Info:</strong> {author}</p>
                    <p className="description"><strong>Description:</strong> {imageUrl.repeat(5).split('https://')}</p>

                </div>
                <div className="button-container">
                    <button className="copy-link-button" onClick={copyLinkHandler}>Copy Link</button>
                </div>
            </div>
        </div>      
    );
}

export default BuyerVerProductDetail;
