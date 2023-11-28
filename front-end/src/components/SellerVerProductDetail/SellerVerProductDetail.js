import React, { useEffect, useState } from 'react';
import './SellerVerProductDetail.css';
import Header from '../Header/Header';
import Slider from "react-slick";  // Importing the Slider component
import { useParams } from 'react-router-dom';

function SellerVerProductDetail() {
    const { id } = useParams();
    const [itemDetails, setItemDetails] = useState(null);
    const [productStatus, setProductStatus] = useState("Available");
    
    useEffect(() => {
        async function fetchProductDetails() {
            try {
                const response = await fetch(`/api/seller-product-detail/${id}`);
                if (response.ok) {
                    const product = await response.json();
                    setItemDetails(product);
                    setProductStatus(product.status);
                } else {
                    throw new Error('Failed to fetch product details.');
                }
            } catch (error) {
                console.error('Error fetching seller product details:', error);
            }
        }

        fetchProductDetails();
    }, [id]);

    if (!itemDetails) return <div>Loading...</div>; // Display a loading state

    const imageUrl = `http://localhost:3001/uploads/${itemDetails.imagePath}`;
    const productName = itemDetails.productName;
    const price = itemDetails.price;
    const category = itemDetails.category;
    const description = itemDetails.description;

    const toggleStatus = () => {
        const newStatus = productStatus === "Available" ? "Sold" : "Available";
        fetch(`/api/seller-product-detail/${id}/status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }),
        })
        .then(response => response.json())
        .then(data => {
            setProductStatus(data.status);
            alert(`Your product status is now: ${data.status}`);
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
                            <img src={imageUrl} alt={productName}/>
                        </div>
                        {/* Additional images can be added here if available */}
                        <div className="each-pic">
                            <img src={imageUrl} alt={productName}/>
                        </div>
                        <div className="each-pic">
                            <img src={imageUrl} alt={productName}/>
                        </div>
                        <div className="each-pic">
                            <img src={imageUrl} alt={productName}/>
                        </div>
                    </Slider>
                </div>
                <div className="product-info">
                    <p><strong>Name:</strong> {productName}</p>
                    <p><strong>Price:</strong> ${price}</p>
                    <p><strong>Category:</strong> {category}</p>
                    <p><strong>Description:</strong> {description}</p>
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