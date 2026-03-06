import React from 'react';

const ProfileCard = ({ profile }) => {
  return <div className="profile-card text-white">{profile?.name}</div>;
};

export default ProfileCard;
