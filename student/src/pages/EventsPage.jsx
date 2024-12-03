import React, { useState } from "react";
import "../styles/EventsPage.css";
import Sidebar from "../components/Sidebar";
import { format } from "date-fns";
import EventsData from "../api/fetchEventsData";
import EventList from "../components/EventsList";

const EventsPage = ({ hallID }) => {
    const [events, setEvents] = useState([]);
    const [eventType, setEventType] = useState("UpcomingEvents");

    const handleDataReceived = (data) => {
        const eventsArray = [];
        for (const [date, eventsByDate] of Object.entries(data)) {
            eventsByDate.forEach((event) => {
                eventsArray.push({ ...event, date });
            });
        }
        setEvents(eventsArray);
    };

    const formatDate = (dateString) => {
        return format(new Date(dateString), "dd-MM-yyyy");
    };

    const handleEventTypeChange = (e) => {
        setEventType(e.target.value);
    };

    return (
        <>
            <Sidebar hallID={hallID} />
            <div className="event-type">
                <select name="typeOfEvent" onChange={handleEventTypeChange}>
                    <option value="UpcomingEvents">Upcoming Events</option>
                    <option value="PreviousEvents">Previous Events</option>
                </select>
            </div>
            <div className="events-page-container">
                <EventsData
                    hallID={hallID}
                    onDataReceived={handleDataReceived}
                />
                <EventList
                    events={events}
                    formatDate={formatDate}
                    eventType={eventType}
                />
            </div>
        </>
    );
};

export default EventsPage;
