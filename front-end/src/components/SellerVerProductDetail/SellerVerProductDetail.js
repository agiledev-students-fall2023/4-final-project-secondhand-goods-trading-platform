import React, { useEffect, useState } from 'react';
import './SellerVerProductDetail.css';
import Header from '../Header/Header';
import Slider from "react-slick";  // Importing the Slider component
import { useParams } from 'react-router-dom';

function SellerVerProductDetail() {
    const { id } = useParams();
    const [itemDetails, setItemDetails] = useState(null);
    
    useEffect(() => {
        async function fetchProductDetails() {
            try {
                const response = await fetch(`/api/seller-product-detail/${id}`);
                if (response.ok) {
                    const product = await response.json();
                    setItemDetails(product);
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

    const productName = itemDetails.productName;
    const price = itemDetails.price;
    const category = itemDetails.category;
    const description = itemDetails.description;

    // Event handler function for copying the hyperlink
    const copyLinkHandler = () => {
        // Construct the URL manually
        const baseUrl = 'http://167.172.230.126'; // Replace with deployment's base URL
        const productPath = `/buyerverproductdetail/for/${id}`;
        const fullUrl = baseUrl + productPath;
    
        navigator.clipboard.writeText(fullUrl)
            .then(() => {
                alert('The link for this product is copied to clipboard!');
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

    const deleteProduct = async () => {
        if (itemDetails && itemDetails.status === 'Sold') {
            alert('You cannot take off this product as it has already been sold.');
            return;
        }
        const confirmDelete = window.confirm('Do you really want to take off this product?');
        if (confirmDelete) {
            try {
                const response = await fetch(`/api/seller-product-detail/${id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    alert('Product has been successfully taken off.');
                    // Redirect to MySellingItems.js page or another appropriate page
                    window.location.href = '/viewyourproduct';
                } else {
                    alert('Failed to take off the product.');
                }
            } catch (error) {
                console.error('Error taking off product:', error);
            }
        }
    };

    const approvePurchase = async () => {
        if (itemDetails.status === 'Sold') {
          alert('This item is already sold so you cannot approve purchase.');
          return;
        }

        if (itemDetails.status === 'Available') {
            alert('There is no pending approval to approve.');
            return;
        }

        const confirmApproval = window.confirm('Are you sure you want to approve this purchase?');
        if (!confirmApproval) {
            return; // If the user clicks "Cancel", stop the function
        }

        try {
          const response = await fetch(`/api/seller-product-detail/${id}/approve`, {
            method: 'POST'
          });
          const data = await response.json();
          if (response.ok) {
            setItemDetails({ ...itemDetails, status: 'Sold' });
            alert(data.message);
          } else {
            alert(data);
          }
        } catch (error) {
          console.error('Error approving purchase:', error);
        }
    };
    const denyPurchase = async () => {
        if (itemDetails.status === 'Available') {
            alert('There is no pending approval to deny.');
            return;
        }

        if (itemDetails.status === 'Sold') {
            alert('This item is already sold so you cannot deny purchase.');
            return;
        }

        const denyApproval = window.confirm('Are you sure you want to deny this purchase?');
        if (!denyApproval) {
            return; // If the user clicks "Cancel", stop the function
        }
    
        try {
            const response = await fetch(`/api/seller-product-detail/${id}/deny`, {
                method: 'POST'
            });
            const data = await response.json();
            if (response.ok) {
                setItemDetails({ ...itemDetails, status: 'Available' });
                alert('You denied the latest purchase and the product is available now.');
            } else {
                alert(data);
            }
        } catch (error) {
            console.error('Error denying purchase:', error);
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
                        <span>Status: {itemDetails.status}</span>
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
                    <button className="take-off-button" onClick={deleteProduct}>Take Off Product</button>
                    <button className="copy-link-button" onClick={copyLinkHandler}>Copy Link</button>
                </div>
                <div className="approve-purchase-container">
                    <button className="approve-purchase-button" onClick={approvePurchase}>Approve Purchase</button>
                    <button className="deny-purchase-button" onClick={denyPurchase}>Deny Purchase</button>
                </div>
            </div>
        </div>
    );
}

export default SellerVerProductDetail;