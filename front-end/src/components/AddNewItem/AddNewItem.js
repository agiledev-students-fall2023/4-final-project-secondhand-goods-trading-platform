import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddNewItem.css';
import Menu from '../Menu/Menu';

const categoryList = ['Furniture', 'Study Supplies', 'Electronics', 'Clothes'];

function AddNewItem(){

    const [productName, setProductName] = useState('');
    const [Category, setCategory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [Price, setPrice] = useState('')
    const [Description, setDescription] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // for image upload
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        setImages(files);

        const previewFiles = files.map(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            return new Promise(resolve => {
                reader.onloadend = () => {
                    resolve(reader.result);
                };
            });
        });

        Promise.all(previewFiles).then(images => {
            setPreviewImages(images);
        });

    };

    // publish product
    const handlePublishProduct = async (e) => {
        e.preventDefault();

        // input validation in front-end
        if (productName.length === 0 || productName.length > 20){
            setErrorMessage('Please enter a valid name.');
            return;
        }

        if (!Category) {
            setErrorMessage('Please select a category.');
            return;
        }

        if (Price < 0.01 || isNaN(Number(Price))){
            setErrorMessage('Please enter a valid price.');
            return;
        }

        if (!Description){
            setErrorMessage('Description cannot be empty.');
            return;
        }

        if (!Image) {
            setErrorMessage('Please upload a picture.');
            return;
          }

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('Category', Category);
        formData.append('Price', Price);
        formData.append('Description', Description);

        images.forEach((image) => { // there will be at most 4 images
            formData.append('image', image); 
        });

        try{
            // authentication
            const token = localStorage.getItem('token');

            if(!token) {
                setErrorMessage('No authentication token found. Please log in.');
                return;
            }

            const response = await fetch('http://167.172.230.126:3001/api/add-new-item',{
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message); // Show a success message
                navigate('/viewyourproduct');
            } else {
                // Handle errors if the response is not ok
                console.log('Response OK is false:', response);
                setErrorMessage(data.message || 'An error occurred while adding the item.');
            }

        }catch (error){ // network error
            console.error('Catch block error:', error);
            setErrorMessage('An error occurred while adding item.');
        }
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
                        className={`category-button ${selectedCategory === categoryList[index] ? 'selected' : ''}`}
                        onClick={() => {
                            setCategory(categoryList[index]);
                            setSelectedCategory(categoryList[index]); // stay hover
                        }}>
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
                    {previewImages[0] ? ( // only preview the first picture
                        <div className="image-preview">
                            <img src={previewImages[0]} alt="Preview 1" />
                        </div>
                    ): (
                    <div className="placeholder">
                        <input type="file" onChange={handleImageChange} multiple accept="image/*" />
                        <div className="plus-icon"><img src={`${process.env.PUBLIC_URL}/addIcon.png`} alt="AddNew"/></div>
                    </div>
                    )}
                </section>

                <section>
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    <button className='publish-button' onClick={handlePublishProduct}>Publish Your New Product</button>
                </section>
            </div>
        </div>

    )
}

export default AddNewItem;