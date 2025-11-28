import React, { useState } from 'react'

const ReactJs_ObjectOfData = () => {
    const [profile, setProfile] = useState({
        name: '',
        age: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProfile((prevProfile) => ({
            ...prevProfile, [name]: value,
        }))
    }
    return (
        <div>
            <h2>User Profile</h2>
            <div>
                <label>Name:
                    <input type="text" name='name' value={profile.name} placeholder='Enter your name' onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>Age :
                    <input type="number" name='age' value={profile.age} placeholder='Enter your age' onChange={handleChange} />
                </label>
            </div>
            <h3>Profile Information</h3>
            <p>Name : {profile.name}</p>
            <p>Age: {profile.age}</p>
        </div>
    )
}

export default ReactJs_ObjectOfData