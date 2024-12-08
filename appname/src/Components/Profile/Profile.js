import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetchProfile,userUpdate } from '../../api/api';
const Profile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/'); // Redirect if not logged in
        window.location.reload();
        return;
      }

      try {
        const response = await fetchProfile(token);
        setUser(response.data);
        setFormData({ name: response.data.name, email: response.data.email });
      } catch (error) {
        console.error('Error fetching profile:', error);
        //navigate('/login'); // Redirect on error
        console.log(error)
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
     const response = await userUpdate(formData,token);
      alert(response.data.message);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();

  };

  return (
    <div>
      <h1>Profile Page</h1>
      <form onSubmit={handleUpdateProfile}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
