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

        // TODO: Update back-end data, store the info
        // Then redirect to the home page after "successful" sign-up.
        navigate('/home');
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