import React, { useState } from 'react';
import '../css/modal.css'

const BootstrapAlert = () => {

  const [showAlert, setShowAlert] = useState(true);



  const handleClose = () => {
    setShowAlert(false);
  };

  return (
    showAlert && (
      <div className="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Wait!</strong> You need to pick a difficulty and category.
        <button type="button" className="btn-close" onClick={handleClose} aria-label="Close">Close</button>
      </div>
    )
  );
};
export default BootstrapAlert;
