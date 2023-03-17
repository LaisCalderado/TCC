import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../../components/Navbar';
import './styles.css';

function ProfileScreen(props) {
    const [name, setName] = useState(props.name);
    const [bio, setBio] = useState(props.bio);
    const [profilePicture, setProfilePicture] = useState(props.profilePicture);
    const [isEditing, setIsEditing] = useState(false);
    const [showFriends, setShowFriends] = useState(true);
    const [showActivityFeed, setShowActivityFeed] = useState(true);
    const [friends, setFriends] = useState([
        { name: 'Chico Preto', profilePicture: 'https://via.placeholder.com/150' },
        { name: 'Maria Rosa', profilePicture: 'https://via.placeholder.com/150' },
        { name: 'Paula Pedrita', profilePicture: 'https://via.placeholder.com/150' },
    ]);
    const [activityFeed, setActivityFeed] = useState([
        { message: 'Started following Jane Doe', timestamp: new Date('2023-02-12T09:00:00Z') },
        { message: 'Added new project: "React App"', timestamp: new Date('2023-02-11T12:30:00Z') },
        { message: 'Liked Lais Calderado\'s post', timestamp: new Date('2023-02-10T18:15:00Z') },
    ]);
    const [portfolio, setPortfolio] = useState([
        { name: 'React App', description: 'A web application built with React', imageUrl: 'https://via.placeholder.com/150' },
        { name: 'Node.js Server', description: 'A simple Node.js server', imageUrl: 'https://via.placeholder.com/150' },
    ]);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleBioChange = (event) => {
        setBio(event.target.value);
    };

    const handleProfilePictureChange = (event) => {
        setProfilePicture(event.target.value);
    };

    const handleSaveProfile = () => {
        // code to save the updated profile information goes here
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        // reset the state variables to their original values
        setName(props.name);
        setBio(props.bio);
        setProfilePicture(props.profilePicture);
        setIsEditing(false);
    };

    return (
        <>
            <Navbar />
            <div id="profile" className="profile">
                <h1>Profile</h1>
                {isEditing ? (
                    <div className="profile-form">
                        <div className="field">
                            <label>
                                Nome:
                                <input type="text" value={name} onChange={handleNameChange} />
                            </label>
                        </div>
                        <div className="field">
                            <label>
                                Bio:
                                <textarea value={bio} onChange={handleBioChange}></textarea>
                            </label>
                        </div>
                        <div className="field">
                            <label>
                                Profile Picture:
                                <input type="text" value={profilePicture} onChange={handleProfilePictureChange} />
                            </label>
                        </div>
                        <br />
                        <button onClick={handleSaveProfile}>Save Profile</button>
                        <button className="cancel-button" onClick={handleCancelEdit}>Cancel</button>
                    </div>
                ) : (
                    <>
                        <div className="profile-summary">
                            <img src={profilePicture} alt="Profile" className="profile-picture" />
                            <div className="profile-info">
                                <h2>{name}</h2>
                                <p>{bio}</p>
                            </div>
                            <div className="profile-options">
                                <button onClick={() => setIsEditing(true)}> Edit Profile</button>
                                <button>Logout</button>
                            </div>
                        </div>
                        <div className="profile-details">
                            <div className="profile-details-column">
                                <h3>Amigos</h3>
                                <ul className="profile-friends-list">
                                    {friends.map((friend, index) => (
                                        <li>
                                            <img src={friend.profilePicture} alt={friend.name} />
                                            <span>{friend.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="profile-details-column">
                                <ul className="profile-activity-feed">
                                    {activityFeed.map((activity, index) => (
                                        <li key={index}>
                                            <span>{activity.message}</span>
                                            <span className="activity-timestamp">{activity.timestamp.toLocaleString()}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="profile-details-column">
                                <h3>Portfolio</h3>
                                <ul className="profile-portfolio-list">
                                    {portfolio.map((project, index) => (
                                        <li key={index}>
                                            <img src={project.imageUrl} alt={project.name} />
                                            <div className="project-info">
                                                <h4>{project.name}</h4>
                                                <p>{project.description}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="profile-privacy">
                            <h3>Privacy Settings</h3>
                            <div className="privacy-options">
                                <div className="privacy-option">
                                    <span>Mostrar minha lista de amigos</span>
                                    <input type="checkbox" checked={true} />
                                </div>
                                <div className="className=" privacy-option>
                                    <span>Show my activity feed:</span>
                                    <input type="checkbox" checked={true} />
                                </div>
                                <div className="privacy-option">
                                    <span>Show my portfolio:</span>
                                    <input type="checkbox" checked={true} />
                                </div>
                            </div>
                        </div>

                    </>
                )}
            </div>
        </>
    );
}

ProfileScreen.propTypes = {
    name: PropTypes.string,
    bio: PropTypes.string,
    profilePicture: PropTypes.string,
};

ProfileScreen.defaultProps = {
    name: 'Nome',
    bio: 'Bio',
    profilePicture: 'https://via.placeholder.com/150',
};

export default ProfileScreen;