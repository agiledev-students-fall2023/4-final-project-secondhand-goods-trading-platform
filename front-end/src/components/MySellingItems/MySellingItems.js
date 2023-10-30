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
            if(!myitems) { // fetch from the random photo generator
                const result = await axios(
                    "https://picsum.photos/v2/list?page=3&limit=100"
                );
                setData(result.data);
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