import React, { useState, useEffect } from "react";
import "../styles/EventsPage.css";
import Sidebar from "../components/Sidebar";
import { format } from "date-fns";
import EventsData from "../api/fetchEventsData";
import EventList from "../components/EventsList";

const EventsPage = ({ hallID }) => {
    const [events, setEvents] = useState([]);
    const [eventType, setEventType] = useState("UpcomingEvents");

    useEffect(() => {
        const cookieHallNumber = document.cookie
            .split("; ")
            .find((row) => row.startsWith("hallNumber="))
            ?.split("=")[1];

        if (!cookieHallNumber || cookieHallNumber !== hallID) {
            alert(
                "You are not authorized to access this page. Please Login (again)."
            );
            document.cookie.split(";").forEach((cookie) => {
                const name = cookie.split("=")[0].trim();
                document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            });
            window.location.href = "/login";
        }
        console.log("Hall ID in Cookie:", cookieHallNumber);
    }, [hallID]);

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
