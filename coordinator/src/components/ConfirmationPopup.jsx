import React from "react";
import "../styles/ConfirmationPopup.css";

const ConfirmationPopup = ({ onConfirm, onCancel }) => {
    return (
        <div className="confirmation-popup">
            <p>
            Are you sure you want to delete this event?
            </p>
            <div className="button-container">
                <button className="confirm-button" onClick={onConfirm}>
                    Yes
                </button>
                <button className="cancel-button" onClick={onCancel}>
                    No
                </button>
            </div>
        </div>
    );
};

export default ConfirmationPopup;
