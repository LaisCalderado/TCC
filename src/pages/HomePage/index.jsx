import React, { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { Link } from 'react-router-dom';

import './style.css';


const HomePage = () => {

    const { authenticated, logout } = useContext(AuthContext);
    const handleLogout = () => {
        logout();
    };

    const { profile } = useContext(AuthContext);
    //const navigate = useNavigate();

    const handleProfileClick = () => {
        profile();
    }


    return (
        <>
            <div>
                <nav className="navbar navbar-dark bg-purple-transparent">
                    <div className="container">
                        <Link to="/" className="navbar-brand">Home</Link>
                        <Link to="/profile" className="nav-link">Profile</Link>
                    </div>
                </nav>
                <div className="container">
                    <h1>Home</h1>
                    <p>Welcome to the home page!</p>
                    <p>{String(authenticated)}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>

            <div>
                <h1>Welcome to my App</h1>
                <p>Click the button below to view your profile:</p>
                <button onClick={handleProfileClick}>Go to Profile</button>
            </div>
        </>
    );

};

export default HomePage