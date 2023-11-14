import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MySellingItems.css";
import { Link } from "react-router-dom";

function MyItem(props) {
    const imageUrl = props.details.download_url  || process.env.PUBLIC_URL + '/listing-placeholder.png';
    return (
        <article className="myitem">
            <Link to={`/sellerverproductdetail/for/${props.details.id}`}>
                <img src={imageUrl} alt={props.details.author} />
            </Link>
            <Link to={`/sellerverproductdetail/for/${props.details.id}`}>
                <p>{props.details.author}</p>
            </Link>
            
        </article>
    );
}

function MySellingItems({ myitems }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            if(!myitems) { // fetch from the back-end
                try{
                    const result = await axios('http://localhost:3001/api/my-selling-items');
                    setData(result.data);
                }catch (error){
                    console.error('Error fetching my selling items:', error);
                }
            }
        }
        fetchData();
    }, [myitems]);

    const displayItems = myitems || data;

    return (
        <section className="my-item-listings">
            {displayItems.map((item, index) => (
                <MyItem key={index} details={item} />
            ))}
        </section>
    );
}

export default MySellingItems;