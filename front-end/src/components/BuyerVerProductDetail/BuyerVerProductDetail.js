import React, { useEffect, useState } from 'react';
import './BuyerVerProductDetail.css';
import Header from '../Header/Header';
import Slider from "react-slick";
import { useParams } from 'react-router-dom';


function BuyerVerProductDetail() {
    const { id } = useParams();
    const [itemDetails, setItemDetails] = useState(null);
    
    useEffect(() => {
        async function fetchProductDetails() {
            try {
                const response = await fetch(`/api/product-detail/${id}`);
                if (response.ok) {
                    const product = await response.json();
                    setItemDetails(product);
                } else {
                    throw new Error('Failed to fetch product details.');
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        }

        fetchProductDetails();
    }, [id]);

    if (!itemDetails) return <div>Loading...</div>;

    // Using the new schema properties
    const productName = itemDetails.productName;
    const price = itemDetails.price;
    const category = itemDetails.category;
    const description = itemDetails.description;
    const productStatus = itemDetails.status;

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

    const buyProduct = async () => {
        if (itemDetails.status !== 'Available') {
            if (itemDetails.status === 'Pending Purchase Approval') {
                alert('This Product is pending for purchase approval. Cannot buy Now.');
            } else if (itemDetails.status === 'Sold') {
                alert('This product has already been sold. You cannot buy it anymore.');
            }
            return;
        }
    
        const confirmPurchase = window.confirm('Are you sure you want to buy this product?');
        if (!confirmPurchase) {
            return; // If the user clicks "Cancel", stop the function
        }
        
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        try {
            const response = await fetch(`/api/product-detail/${id}/buy`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (response.ok) {
                const data = await response.json();
                setItemDetails({ ...itemDetails, status: 'Pending Purchase Approval' });
                alert(data.message);
            } else {
                const errorData = await response.json(); // Retrieve error message from response
                alert(errorData.message); // Display the specific error message from the server
            }
        } catch (error) {
            console.error('Error buying product:', error);
            alert('Failed to process this purchase request.');
        }
    };
    
    function prepareImageUrls(imagePaths) {
        const urls = imagePaths.map(path => `http://167.172.230.126:3001/uploads/${path}`);
        while (urls.length < 4) {
            urls.push(urls[0]); // Repeat the first image if less than 4 images are provided
        }
        return urls;
    }

    const imageUrls = itemDetails ? prepareImageUrls(itemDetails.imagePaths) : [];

    return (
        <div className="product-detail-container"> 
            <Header />
            
            <div className="product-detail-content">
                <div className="item-picture">
                    <div className="status-section">
                        <span>Status: {productStatus}</span>
                    </div>
                    <Slider {...settings}>
                        {imageUrls.map((url, index) => (
                            <div className="each-pic" key={index}>
                                <img src={url} alt={`Product ${index + 1}`} />
                            </div>
                        ))}
                    </Slider>
                </div>
                <div className="product-info">
                    <p><strong>Name:</strong> {productName}</p>
                    <p><strong>Price:</strong> ${price}</p>
                    <p><strong>Category:</strong> {category}</p>
                    <p><strong>Description:</strong> {description}</p>
                </div>
                <div className="button-container">
                    <button className="buy-button" onClick={buyProduct}>Buy Product</button>
                    <button className="copy-link-button" onClick={copyLinkHandler}>Copy Link</button>
                </div>
            </div>
        </div>      
    );
}

export default BuyerVerProductDetail;
