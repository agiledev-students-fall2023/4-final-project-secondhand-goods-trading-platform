import React, { useState, useEffect } from "react";
import "./MySellingItems.css";
import { Link } from "react-router-dom";

function MyItem(props) {
    // to show the first picture of all four pictures as the cover
    const imageUrl = `http://167.172.230.126:3001/uploads/${props.details.imagePaths[0]}`;
    const productName = props.details.productName;
    const productId = props.details._id;
    return (
        <article className="myitem">
            <Link to={`/sellerverproductdetail/for/${productId}`}>
                <img src={imageUrl} alt={productName} />
            </Link>
            <Link to={`/sellerverproductdetail/for/${productId}`}>
                <p>{productName}</p>
            </Link>
            
        </article>
    );
}

function MySellingItems({ items }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            if (!items){
                try {
                    // Send the token in the request to the backend
                    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
                    const result = await fetch('http://167.172.230.126:3001/api/my-selling-items', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    });
                    if (result.ok) {
                        const items = await result.json();
                        console.log(items); // Logging the fetched data
                        setData(items);
                    } else {
                        throw new Error('Network response was not ok.');
                    }
                } catch (error) {
                    console.error('Error fetching my selling items:', error);
                }
            }
        }

        fetchData();
    }, [items]);

    const displayItems = items || data;

    return (
        <section className="my-item-listings">
            {displayItems.map((item, index) => (
                <MyItem key={index} details={item} />
            ))}
        </section>
    );
}

export default MySellingItems;