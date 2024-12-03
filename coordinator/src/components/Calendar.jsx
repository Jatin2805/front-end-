import React, { useState } from "react";
import Calendar from "react-calendar";
import "../styles/CalendarComponent.css";
import addEventSubmit from "../api/addEventSubmit";

function CalendarComponent({
    hallID,
    selectedDate,
    onDateChange,
    tileClassName,
    onDateClick,
    eventData,
}) {
    const [showPopup, setShowPopup] = useState(false);
    const [eventName, setEventName] = useState("");
    const [eventClub, setEventClub] = useState("");
    const [eventDetails, setEventDetails] = useState("");
    const [eventDate, setEventDate] = useState(selectedDate || new Date());
    const [startTime, setStartTime] = useState("12:00 PM");
    const [endTime, setEndTime] = useState("12:00 PM");

    console.log("Calendar data: ", eventData);

    const handleDateClick = (date) => {
        if (onDateClick) {
            onDateChange(date);
            onDateClick(date);
        }
    };

    const handleAddEvent = () => {
        setShowPopup(true);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    const updateTime = (field, hour, minute, period) => {
        const newTime = `${hour}:${minute} ${period}`;
        if (field === "start") {
            setStartTime(newTime);
        } else {
            setEndTime(newTime);
        }
    };

    const timeOptions = () => {
        let options = [];
        for (let i = 1; i <= 12; i++) {
            const hour = `${i}`.padStart(2, "0");
            options.push(
                <option key={`${hour}-00`} value={`${hour}-00`}>
                    {`${hour}:00`}
                </option>,
                <option key={`${hour}-30`} value={`${hour}-30`}>
                    {`${hour}:30`}
                </option>
            );
        }
        return options;
    };

    const handleEventSubmit = () => {
        const eventData = {
            hallID: hallID,
            events: [
                {
                    eventName: eventName,
                    eventClub: eventClub,
                    eventDescription: eventDetails,
                    eventDate: eventDate.toISOString().split("T")[0],
                    eventStart: formatTime(startTime),
                    eventEnd: formatTime(endTime),
                },
            ],
        };

        try {
            addEventSubmit(eventData);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }

        setShowPopup(false);
    };

    const formatTime = (time) => {
        const [hourMinute, period] = time.split(" ");
        return `${hourMinute} ${period}`;
    };

    return (
        <div className="container">
            <Calendar
                value={selectedDate}
                onChange={onDateChange}
                onClickDay={handleDateClick}
                tileClassName={tileClassName}
            />
            <button onClick={handleAddEvent} className="add-event-button">
                Add Event
            </button>
            {showPopup && (
                
                    <div className="popup-content">
                        <span className="close" onClick={handlePopupClose}>
                            &times;
                        </span>
                        <h2>Add Event</h2>
                        <input
                            type="text"
                            className="event-input"
                            placeholder="Event Name"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                        />
                        <input
                            type="text"
                            className="event-input"
                            placeholder="Event Club"
                            value={eventClub}
                            onChange={(e) => setEventClub(e.target.value)}
                        />
                        <textarea
                            className="event-input"
                            placeholder="Event Details"
                            value={eventDetails}
                            onChange={(e) => setEventDetails(e.target.value)}
                        />
                        <input
                            type="date"
                            className="event-input"
                            value={eventDate.toISOString().split("T")[0]}
                            onChange={(e) =>
                                setEventDate(new Date(e.target.value))
                            }
                        />
                        <div className="time-input">
                            <label htmlFor="startTime">Start Time</label>
                            <select
                                id="startTimeHourMinute"
                                onChange={(e) => {
                                    const [hour, minute] =
                                        e.target.value.split("-");
                                    updateTime(
                                        "start",
                                        hour,
                                        minute,
                                        document.getElementById(
                                            "startTimePeriod"
                                        ).value
                                    );
                                }}
                                defaultValue={startTime
                                    .split(" ")[0]
                                    .replace(":", "-")}
                            >
                                {timeOptions()}
                            </select>
                            <select
                                id="startTimePeriod"
                                onChange={(e) => {
                                    const [hour, minute] = document
                                        .getElementById("startTimeHourMinute")
                                        .value.split("-");
                                    updateTime(
                                        "start",
                                        hour,
                                        minute,
                                        e.target.value
                                    );
                                }}
                                defaultValue={startTime.split(" ")[1]}
                            >
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                            </select>
                        </div>
                        <div className="time-input">
                            <label htmlFor="endTime">End Time</label>
                            <select
                                id="endTimeHourMinute"
                                onChange={(e) => {
                                    const [hour, minute] =
                                        e.target.value.split("-");
                                    updateTime(
                                        "end",
                                        hour,
                                        minute,
                                        document.getElementById("endTimePeriod")
                                            .value
                                    );
                                }}
                                defaultValue={endTime
                                    .split(" ")[0]
                                    .replace(":", "-")}
                            >
                                {timeOptions()}
                            </select>
                            <select
                                id="endTimePeriod"
                                onChange={(e) => {
                                    const [hour, minute] = document
                                        .getElementById("endTimeHourMinute")
                                        .value.split("-");
                                    updateTime(
                                        "end",
                                        hour,
                                        minute,
                                        e.target.value
                                    );
                                }}
                                defaultValue={endTime.split(" ")[1]}
                            >
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                            </select>
                        </div>

                        <button
                            onClick={handleEventSubmit}
                            className="event-submit-button"
                        >
                            Submit
                        </button>
                    </div>
                
            )}
        </div>
    );
}

export default CalendarComponent;
