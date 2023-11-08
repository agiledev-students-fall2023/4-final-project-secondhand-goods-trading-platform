import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SellerVerProductDetail.css';
import Header from '../Header/Header';
import Slider from "react-slick";  // Importing the Slider component
import { useParams } from 'react-router-dom';

function SellerVerProductDetail() {
    const { id } = useParams();

    const [itemDetails, setItemDetails] = useState(null);
    const [productStatus, setProductStatus] = useState("Available"); // Set the initial state as 'Available'
    
    useEffect(() => {
        // Update the URL to your backend endpoint
        axios.get(`/api/seller-product-detail/${id}`)
            .then(response => {
                setItemDetails(response.data);
                setProductStatus(response.data.status); // Set the status from the backend data
            })
            .catch(error => {
                console.error('Error fetching seller product details:', error);
            });
    }, [id]);

    if (!itemDetails) return <div>Loading...</div>; // Display a loading state

    // fake fetch
    const imageUrl = itemDetails.download_url;
    const author = itemDetails.author;
    const price = itemDetails.width;

    const authorHashValue = parseInt(author.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)) % 4 + 1;
    const categories = ['Furniture', 'Study Supplies', 'Electronics', 'Clothes'];
    const conditions = ['Used', 'New', '90% New', '75% New'];
    
    const category = categories[authorHashValue - 1];
    const condition = conditions[authorHashValue - 1];

    const toggleStatus = () => {
        const newStatus = productStatus === "Available" ? "Sold" : "Available";
        axios.post(`/api/seller-product-detail/${id}/status`, { status: newStatus })
            .then(() => {
                setProductStatus(newStatus);
                alert(`Your product status is now: ${newStatus}`);
            })
            .catch(err => {
                console.error('Error updating status: ', err);
            });
    };

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
                        <span>Status: {productStatus}</span>
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
                    <p><strong>Category:</strong> {category}</p>
                    <p><strong>Condition:</strong> {condition}</p>
                    <p><strong>Seller Contact Info:</strong> {author}</p>
                    <p className="description"><strong>Description:</strong> {imageUrl.repeat(5).split('https://')}</p>
                </div>
                <div className="button-container">
                    <button className="take-off-button" onClick={toggleStatus}>Take Off / Launch</button> {/* Added the "Take Off / Launch" button */}
                    <button className="copy-link-button" onClick={copyLinkHandler}>Copy Link</button>
                </div>
            </div>
        </div>
    );
}

export default SellerVerProductDetail;