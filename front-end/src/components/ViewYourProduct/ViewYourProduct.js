import React from 'react';
import './ViewYourProduct.css';
import MySellingItems from '../MySellingItems/MySellingItems';
import { Link } from 'react-router-dom';
import Menu from '../Menu/Menu';

function ViewYourProduct(){
    return(
        <div>
            <section className='viewyourproduct'>
                <Menu />
                
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