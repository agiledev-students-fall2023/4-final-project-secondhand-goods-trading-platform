import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';


const Login = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Temporarily Use piscum dataset for verification 
            const { data } = await axios.get('https://picsum.photos/v2/list');

            console.log(username, email, password);
            const user = data.find(photo => 
                photo.author === username && 
                photo.id === email && 
                photo.width.toString() === password // Convert width to string for comparison
            );

            if (user) {
                // Successful login
                navigate('/home');     // Redirect to homepage
            } else {
                setErrorMessage('Invalid username, email, or password. Please try again.');
            }
        } catch (error) {
            console.error("There was an error fetching the data", error);
        }
    }

    return (
        <div className="login-page">
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Email/Tel:</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    <button type="submit">Login/Sign up</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
