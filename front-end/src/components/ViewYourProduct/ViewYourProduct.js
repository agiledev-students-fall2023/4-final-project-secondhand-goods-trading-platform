import React from 'react';
import './ViewYourProduct.css';

import AddNewItem from '../AddNewItem/AddNewItem';
import MySellingItems from '../MySellingItems/MySellingItems';

import { Link } from 'react-router-dom';

function ViewYourProduct(){

    return(
        <div>
            <section className='viewyourproduct'>
                <Link to="/home">
                    <button className="icon-button"><img src={`${process.env.PUBLIC_URL}/home-icon.png`} alt="Home"/></button>
                </Link>
                
                <Link to="/addnewitem" className="add-new-item-button">
                        <img src={`${process.env.PUBLIC_URL}/addIcon.png`} alt="AddNew"/>
                        <span>Add New Item</span>
                </Link>
            </section>

            <section className='Selling-Items'>
                <MySellingItems />
            </section>

        </div>
    )
}
export default ViewYourProduct;