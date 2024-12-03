import React, { useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/EditEventPopup.css";
import addEventSubmit from "../api/addEventSubmit";
import onDelete from "./onDelete";

const EditEventPopup = ({ hallID, event, onClose }) => {
    const [updatedEvent, setUpdatedEvent] = useState(event);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedEvent((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            await onDelete(hallID, event);
            const eventData = {
                hallID: hallID,
                events: [
                    {
                        eventName: updatedEvent.eventName,
                        eventClub: updatedEvent.eventClub,
                        eventDescription: updatedEvent.eventDescription,
                        eventDate: updatedEvent.eventDate,
                        eventStart: updatedEvent.eventStart,
                        eventEnd: updatedEvent.eventEnd,
                    },
                ],
            };

            console.log("Adding event:", eventData);
            await addEventSubmit(eventData).then(window.location.reload());
            onClose();
        } catch (error) {
            console.error("Error handling save:", error);
        }
    };

    return (
        <div className="edit-popup-container">
            <div className="edit-popup-content">
                <div className="edit-popup-header">
                    <div className="button-close" onClick={onClose}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
                <h2>Edit Event</h2>
                <label>
                    Name:
                    <input
                        type="text"
                        name="eventName"
                        value={updatedEvent.eventName}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Club:
                    <input
                        type="text"
                        name="eventClub"
                        value={updatedEvent.eventClub}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Start Time:
                    <input
                        type="text"
                        name="eventStart"
                        value={updatedEvent.eventStart}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    End Time:
                    <input
                        type="text"
                        name="eventEnd"
                        value={updatedEvent.eventEnd}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        name="eventDescription"
                        value={updatedEvent.eventDescription}
                        onChange={handleChange}
                    />
                </label>
                <button onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default EditEventPopup;
