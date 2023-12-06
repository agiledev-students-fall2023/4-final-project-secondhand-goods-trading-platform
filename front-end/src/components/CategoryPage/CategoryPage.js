import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
//import { getCategory } from '../Utils/Utils';
import Menu from '../Menu/Menu';

import './CategoryPage.css';

function Item(props) {
    const imageUrl = `http://167.172.230.126:3001/uploads/${props.details.imagePath}`;
    const productName = props.details.productName;
    const productId = props.details._id;

    return (
        <article className="item">
            <Link to={`/buyerverproductdetail/for/${productId}`}>
                <img src={imageUrl} alt={productName} />
            </Link>
            <Link to={`/buyerverproductdetail/for/${productId}`}>
                <p>{productName}</p>
            </Link>

        </article>
    );
}

function CategoryPage() {
    let { category } = useParams();

    if (category === 'StudySupplies') {
        category = 'Study Supplies';
    }

    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            
            try {
                const response = await axios.get(`http://167.172.230.126:3001/api/category/for/${encodeURIComponent(category)}`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching items from the category:', error);
            }
            
        }

        fetchData();
    }, [category]);

    //const displayItems = items || data; 

    //const filteredItems = category ? displayItems.filter(item => getCategory(item.author) === category) : displayItems;

    return (
        <div>
            <section className='categorypage'>
                <Menu />
                <section className='categoryname'>
                    Category: {category}
                </section>
            </section>

            <section className="item-listings">
                {data.map((item, index) => (
                    <Item key={item._id || index} details={item} />
                ))}
            </section>

        </div>
    );  
}

export default CategoryPage;