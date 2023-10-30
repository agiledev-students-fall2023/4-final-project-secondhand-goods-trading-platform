import React, { useState } from 'react';
import './AddNewItem.css';

import { Link } from 'react-router-dom';

function AddNewItem(){

    const [productName, setProductName] = useState('');
    const [Category, setCategory] = useState('');
    const [Price, setPrice] = useState('')
    const [Description, setDescription] = useState('')

    // for image upload
    const [Image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(file);
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // publish picture
    const handlePublish = () => {
        if (Image) {
            console.log("Published:", Image);
        }
    };

    // publish product
    const handlePublishProduct = () => {
        console.log("Publish button clicked!");
    };

    const categories = [{ name: 'furniture', icon: `${process.env.PUBLIC_URL}/furniture-icon.png` },
    { name: 'study', icon: `${process.env.PUBLIC_URL}/study-icon.png` },
    { name: 'electronics', icon: `${process.env.PUBLIC_URL}/electronics-icon.png` },
    { name: 'clothes', icon: `${process.env.PUBLIC_URL}/clothes-icon.png` },]

    return(
        <div>
            <Link to="/home">
                    <button className="home-button">
                        <img src={`${process.env.PUBLIC_URL}/home-icon.png`} alt="Home"/>
                    </button>
            </Link>
            <div className='overall-container'>
                <section className='entry'>
                    <p>Product Name:</p>
                </section>
                <section className='input-section'>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Enter product name"
                    />
                </section>

                <section className='entry'> 
                    <p>Category:</p>
                </section>
                <section className="category">
                {categories.map((category, index) => (
                    <button 
                        key={index} 
                        //value = {Category}
                        className="category-button"
                        onClick={() => setCategory(index)}>
                        <img src={category.icon} alt={category.name} />
                    </button>
                ))}
                </section>

                <section className='entry'>
                    <p>Price:</p>
                </section>
                <section className='input-section'>
                    <input
                        type="text"
                        value={Price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter price"
                    />
                </section>

                <section className='entry'>
                    <p>Description:</p>
                </section>
                <section className='input-section'>
                    <input
                        type="text"
                        value={Description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description"
                    />
                </section>

                <section className='entry'>
                    <p>Picture:</p>
                </section>
                <section className="image-upload-container">
                    {previewImage ? (
                        <img src={previewImage} alt="Selected" />
                    ) : (
                        <div className="placeholder">
                            <input type="file" onChange={handleImageChange} />
                            <div className="plus-icon"><img src={`${process.env.PUBLIC_URL}/addIcon.png`} alt="AddNew"/></div>
                        </div>
                    )}
                </section>
                <button onClick={handlePublish}>Upload Picture</button>

                <section>
                    <button className='publish-button' onClick={handlePublishProduct}>Publish Your New Product</button>
                </section>
            </div>
        </div>

    )
}

export default AddNewItem;