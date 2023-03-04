import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../../components/Navbar';

function ProfileScreen(props) {
    const [name, setName] = useState(props.name);
    const [bio, setBio] = useState(props.bio);
    const [profilePicture, setProfilePicture] = useState(props.profilePicture);
    const [isEditing, setIsEditing] = useState(false);

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
            <Navbar/>
            <div id="profile" classe="profile" >
                <h1>Profile</h1>
                {isEditing ? (
                    <div className="profile">
                        <div className="field">
                            <label>
                                Name:
                                <input type="text" value={name} onChange={handleNameChange} />
                            </label>
                        </div>
                        <div>

                            <label>
                                Bio:
                                <textarea value={bio} onChange={handleBioChange} />
                            </label>
                        </div>
                        <div>

                            <label>
                                Profile Picture:
                                <input type="text" value={profilePicture} onChange={handleProfilePictureChange} />
                            </label>
                        </div>
                        <br />
                        <button onClick={handleSaveProfile}>Save Profile</button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                    </div>
                ) : (
                    <div>
                        <img src={profilePicture} alt="Profile Picture" />
                        <h2>{name}</h2>
                        <p>{bio}</p>
                        <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                    </div>
                )}
            </div>
        </>
        
    );
}

ProfileScreen.propTypes = {
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    profilePicture: PropTypes.string.isRequired,
};

export default ProfileScreen;
