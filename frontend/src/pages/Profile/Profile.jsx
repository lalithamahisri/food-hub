import React, { useEffect, useState } from 'react';
import { authAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user: authUser } = useAuth();
  const [profile, setProfile] = useState(authUser || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await authAPI.getProfile();
        if (res.success) {
          setProfile(res.data);
        } else {
          setError(res.message || 'Failed to load profile');
        }
      } catch (err) {
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <h2>Loading profile...</h2>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <h2>Profile</h2>
          <p className="error-message">{error || 'Profile not found'}</p>
        </div>
      </div>
    );
  }

  const fullName =
    (profile.firstName || authUser?.firstName || '') +
    ' ' +
    (profile.lastName || authUser?.lastName || '');

  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .map((p) => p[0]?.toUpperCase())
    .slice(0, 2)
    .join('') || 'U';

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">
            {profile.profileImage ? (
              <img
                src={profile.profileImage}
                alt={fullName || profile.email}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <span>{initials}</span>
            )}
          </div>
          <div className="profile-title">
            <h1>{fullName.trim() || profile.email}</h1>
            <p>FoodHub customer</p>
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-row">
            <span className="label">Email</span>
            <span className="value">{profile.email}</span>
          </div>
          <div className="detail-row">
            <span className="label">Phone</span>
            <span className="value">{profile.phone || '-'}</span>
          </div>
          <div className="detail-row">
            <span className="label">Address</span>
            <span className="value">
              {profile.address
                ? `${profile.address.street || ''} ${profile.address.city || ''} ${
                    profile.address.state || ''
                  } ${profile.address.zipCode || ''} ${profile.address.country || ''}`.trim() ||
                  '-'
                : '-'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

