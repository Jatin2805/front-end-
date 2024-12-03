import React from "react";
import "../styles/EventsList.css";

const EventList = ({ events, formatDate, eventType }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const filteredEvents = events.filter((event) => {
        const eventDate = new Date(event.eventDate);
        if (eventType === "UpcomingEvents") {
            return eventDate >= today;
        } else {
            return eventDate < today;
        }
    });

    const sortedEvents = filteredEvents
        .slice()
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    console.log("Events received by EventList:", events);
    return (
        <div className="events-page-content">
            <div className="events-grid">
                {sortedEvents.length > 0 ? (
                    sortedEvents.map((event, index) => (
                        <div key={index} className="event-card">
                            <p>
                                <strong>Date:</strong> {formatDate(event.date)}
                            </p>
                            <p>
                                <strong>Name:</strong> {event.eventName}
                            </p>
                            <p>
                                <strong>Club:</strong> {event.eventClub}
                            </p>
                            <p>
                                <strong>Description:</strong>{" "}
                                {event.eventDescription}
                            </p>
                            <p>
                                <strong>Start Time:</strong> {event.eventStart}
                            </p>
                            <p>
                                <strong>End Time:</strong> {event.eventEnd}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No events to display.</p>
                )}
            </div>
        </div>
    );
};

export default EventList;
