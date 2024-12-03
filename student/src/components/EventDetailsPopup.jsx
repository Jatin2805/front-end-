import React from "react";
import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/EventDetailsPopup.css";

const EventDetailsPopup = ({ hallID, event, onClose, onDelete }) => {
    return (
        <div className="event-popup-container">
            <div className="event-popup-content">
                <div className="button-close" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
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
        </div>
    );
};

export default EventDetailsPopup;
