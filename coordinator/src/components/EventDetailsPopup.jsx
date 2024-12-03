import React, { useState } from "react";
import { faTimes, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/EventDetailsPopup.css";
import ConfirmationPopup from "./ConfirmationPopup";
import EditEventPopup from "./EditEventPopup";
import onDelete from "./onDelete";

const EventDetailsPopup = ({ hallID, event, onClose }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);

    const handleDeleteClick = () => {
        setShowConfirmation(true);
    };

    const handleConfirmDelete = () => {
        onDelete(hallID, event);
        setShowConfirmation(false);
        window.location.reload();
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
    };

    const handleEdit = () => {
        setShowEditPopup(true);
    };

    return (
        <div className="event-popup-container">
            <div className="event-popup-content">
                <div className="popup-header">
                    <div className="button-delete" onClick={handleDeleteClick}>
                        <FontAwesomeIcon icon={faTrash} />
                    </div>
                    <div className="button-edit" onClick={handleEdit}>
                        <FontAwesomeIcon icon={faEdit} />
                    </div>
                    <div className="button-close" onClick={onClose}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
                <h2>Event Details</h2>
                <p>
                    <strong>Name:</strong> {event.eventName}
                </p>
                <p>
                    <strong>Club:</strong> {event.eventClub}
                </p>
                <p>
                    <strong>Start Time:</strong> {event.eventStart}
                </p>
                <p>
                    <strong>End Time:</strong> {event.eventEnd}
                </p>
                <p>
                    <strong>Description:</strong> {event.eventDescription}
                </p>
            </div>
            {showConfirmation && (
                <ConfirmationPopup
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
            {showEditPopup && (
                <EditEventPopup
                    hallID={hallID}
                    event={event}
                    onClose={() => setShowEditPopup(false)}
                />
            )}
        </div>
    );
};

export default EventDetailsPopup;
