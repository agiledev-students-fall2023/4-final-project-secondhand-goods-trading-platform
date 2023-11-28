import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
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
        const payload = { username, email, password };
        const { data } = await axios.post('http://localhost:3001/api/login', payload); 
        
        if (data && data.token) {
          localStorage.setItem('loggedInUser', username);
          localStorage.setItem('token', data.token);
          axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
          navigate('/home'); // Redirect to homepage
        }else {
        
        }
      } catch (error) {
        console.error("There was an error logging in", error);
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMessage(error.response.data.message); // Use the server's error message
        } else {
          setErrorMessage('An error occurred. Please try again later.'); // Use a generic error message
        }
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
                    <button type="submit">Login</button>
                </div>

                <Link to="/signup" style={{ textDecoration: 'underline' }}>Don't have an account? Sign up here</Link>

            </form>
        </div>
    );
}

export default Login;
