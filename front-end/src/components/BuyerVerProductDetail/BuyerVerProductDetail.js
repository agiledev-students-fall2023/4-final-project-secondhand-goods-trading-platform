import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BuyerVerProductDetail.css';
import Header from '../Header/Header';
import Slider from "react-slick";  // Importing the Slider component
import { useParams } from 'react-router-dom';

import { getCategory } from '../Utils/Utils';

// Define the main component function
function BuyerVerProductDetail() {
    const { id } = useParams();

    // State to store item details fetched from the API
    const [itemDetails, setItemDetails] = useState(null);
    
    // useEffect to perform a side effect: fetching data from an API
    useEffect(() => {
        // Assuming you're fetching data from the same API
        axios.get(`https://picsum.photos/id/${id}/info`).then(response => {
            setItemDetails(response.data);
        });
    }, [id]);

    if (!itemDetails) return <div>Loading...</div>; // Display a loading state


    // fake fetch
    const imageUrl = itemDetails.download_url;
    const author = itemDetails.author;
    const price = itemDetails.width;
    
    // Calculate a hash value based on the author's name to pseudo-randomly select a category and condition
    const authorHashValue = parseInt(author.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)) % 4 + 1;
    /*const categories = ['Furniture', 'Study Supplies', 'Electronics', 'Clothes'];*/
    const conditions = ['Used', 'New', '90% New', '75% New'];
    
    //const category = categories[authorHashValue - 1];
    const category = getCategory(author);
    const condition = conditions[authorHashValue - 1];

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

    // Settings for the Slider component
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
                            <img src={imageUrl} alt="Item 1"/>
                        </div>
                        {/* Add placeholder images for the remaining slides */}
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
                    <p><strong>Category:</strong> {category}</p>
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
