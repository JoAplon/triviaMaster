import React from "react";

const ProfilePictures = ({ pictures, onSelectPicture }) => {
  return (
    <div className="profile-picture-options">
      {pictures.map((picture, index) => (
        <img
          key={index}
          src={picture}
          alt={`Profile ${index + 1}`}
          onClick={() => onSelectPicture(picture)}
        />
      ))}
    </div>
  );
};

export default ProfilePictures;
