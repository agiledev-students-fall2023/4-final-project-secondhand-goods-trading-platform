import React, { useState } from 'react';
import './AddNewItem.css';
import Menu from '../Menu/Menu';


const categoryList = ['Furniture', 'Study Supplies', 'Electronics', 'Clothes'];

function AddNewItem(){

    const [productName, setProductName] = useState('');
    const [Category, setCategory] = useState(null);
    const [Price, setPrice] = useState('')
    const [Description, setDescription] = useState('')
    const [errorMessage, setErrorMessage] = useState('');

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
    const handlePublishProduct = async (e) => {
        e.preventDefault();

        if (productName.length == 0 || productName.length > 20){
            setErrorMessage('Please enter a valid name.');
            return;
        }

        if (Price < 0.01 || isNaN(Number(Price))){
            setErrorMessage('Please enter a valid price.');
            return;
        }

        if (Description.length == 0){
            setErrorMessage('Description cannot be empty.');
            return;
        }

        if (Category === null) {
            setErrorMessage('Please select a category.');
            return;
        }

        try{
            const response = await fetch('http://localhost:3001/api/add-new-item',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productName,
                    Category,
                    Price,
                    Description 
                }),
            });


        }catch (error){ // network error
            setErrorMessage('An error occurred while adding item.');
        }


        console.log("Publish button clicked!");
    };

    const categories = [{ name: 'Furniture', icon: `${process.env.PUBLIC_URL}/furniture-icon.png` },
    { name: 'Study Supplies', icon: `${process.env.PUBLIC_URL}/study-icon.png` },
    { name: 'Electronics', icon: `${process.env.PUBLIC_URL}/electronics-icon.png` },
    { name: 'Clothes', icon: `${process.env.PUBLIC_URL}/clothes-icon.png` },]

    return(
        <div>
            <Menu />
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
                        onClick={() => setCategory(categoryList[index])}>
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
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    <button className='publish-button' onClick={handlePublishProduct}>Publish Your New Product</button>
                </section>
            </div>
        </div>

    )
}

export default AddNewItem;