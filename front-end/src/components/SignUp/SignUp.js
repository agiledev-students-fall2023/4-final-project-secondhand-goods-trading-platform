import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch('http://167.172.230.126:3001/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password 
                }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                alert(data.message); // Show a success message
                localStorage.setItem('loggedInUser', username);
                localStorage.setItem('token', data.token);
                navigate('/home');
            } else if (response.status === 400) {
                console.log("validation error.");
                if (data.errors && Array.isArray(data.errors)) {
                    const errorMessages = data.errors.map(error => error.msg).join(', ');
                    setErrorMessage(`Validation errors: ${errorMessages}`);
                } else {
                    // If the errors array is not present, use the main message from the response
                    setErrorMessage(data.message || 'Validation error occurred.');
                }
            } else {
                // Handle other errors
                console.log("other error.")
                setErrorMessage(data.message);
            }
        } catch (error) {
            // Handle network errors 
            setErrorMessage('An error occurred while signing up.');
            console.error('SignUp error:', error);
        }
    }

        
    

    return (
        <div className="signup-page">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div>
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    <button type="submit">Sign Up</button>
                </div>
            </form>
            <Link to="/" style={{ textDecoration: 'underline' }}>Already have an account? Log in here</Link>
        </div>
    );
}

export default SignUp;
