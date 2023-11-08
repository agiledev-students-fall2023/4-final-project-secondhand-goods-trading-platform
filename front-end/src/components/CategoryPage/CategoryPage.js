import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getCategory } from '../Utils/Utils';
import Menu from '../Menu/Menu';

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
                try { // fetch all products from back-end for now. During database integration, I will filter in the back-end
                    const result = await axios('http://localhost:3001/api/item-listings');
                    setData(result.data);
                } catch (error) {
                    console.error('Error fetching item from the category:', error);
                }
            }
        }

        fetchData();
    }, [items]);

    const displayItems = items || data; 

    const filteredItems = category ? displayItems.filter(item => getCategory(item.author) === category) : displayItems;

    return (
        <div>
            <section className='categorypage'>
                <Menu />
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