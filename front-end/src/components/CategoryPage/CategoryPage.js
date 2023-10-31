import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getCategory } from '../Utils/Utils';

import './CategoryPage.css';

function Item(props) {
    const imageUrl = props.details.download_url  || process.env.PUBLIC_URL + '/listing-placeholder.png';

    return (
            <article className="item">
                <Link to={`/buyerverproductdetail/for/${props.details.id}`}>
                    <img src={imageUrl} alt={props.details.author} />
                </Link>
                <Link to={`/buyerverproductdetail/for/${props.details.id}`}>
                    <p>{props.details.author}</p>
                </Link>

            </article>
    );
}

function CategoryPage({ items }) {
    const { category } = useParams();

    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            if(!items) { 
                const result = await axios(
                    "https://picsum.photos/v2/list?page=3&limit=100"
                );
                setData(result.data);
            }
        }

        fetchData();
    }, [items]);

    const displayItems = items || data; 

    const filteredItems = category ? displayItems.filter(item => getCategory(item.author) === category) : displayItems;

    return (
        <div>
            <section className='categorypage'>
                <Link to="/home">
                        <button className="icon-button"><img src={`${process.env.PUBLIC_URL}/home-icon.png`} alt="Home"/></button>
                </Link>
                <section className='categoryname'>
                    Category: {category}
                </section>
            </section>

            <section className="item-listings">
                {filteredItems.map((item, index) => (
                    <Item key={index} details={item} />
                ))}
            </section>

        </div>
    );  
}

export default CategoryPage;