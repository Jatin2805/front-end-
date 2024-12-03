import React, { useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EventDetailsPopup from "./EventDetailsPopup";
import "../styles/Popup.scss";

const Popup = ({ hallID, onClose, selectedDate, eventData }) => {
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleEventClick = (clickedEvent) => {
        setSelectedEvent(clickedEvent);
    };

    const handleCloseEventPopup = () => {
        setSelectedEvent(null);
    };

    const generateTimes = () => {
        const times = [];
        for (let i = 0; i < 24; i++) {
            const hour = i % 12 === 0 ? 12 : i % 12;
            const period = i < 12 ? "AM" : "PM";
            times.push(`${hour}:00 ${period}`);
            times.push(`${hour}:30 ${period}`);
        }
        return times;
    };

    const renderTimes = () => {
        let eventColor;
        const times = generateTimes();
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1; // Months are zero-indexed
        const date = selectedDate.getDate();
        const selectedDateString = `${year}-${month < 10 ? "0" : ""}${month}-${
            date < 10 ? "0" : ""
        }${date}`;
        const eventsForSelectedDate = eventData[selectedDateString] || [];
        return times.map((time, index) => {
            const [hourStr, minuteStr, period] = time.split(/[: ]/);
            let timeHours = parseInt(hourStr);
            const timeMinutes = parseInt(minuteStr);
            if (period === "PM" && timeHours !== 12) {
                timeHours += 12; // Convert PM hours to 24-hour format
            } else if (period === "AM" && timeHours === 12) {
                timeHours = 0;
            }
            const timeInMinutes = timeHours * 60 + timeMinutes;
            const hasEvent = eventsForSelectedDate.some((event) => {
                const [eventStartHourStr, eventStartMinuteStr] =
                    event.eventStart.split(":");
                let eventStartHours = parseInt(eventStartHourStr);
                const eventStartMinutes = parseInt(eventStartMinuteStr);
                if (event.eventStart.includes("PM") && eventStartHours !== 12) {
                    eventStartHours += 12;
                } else if (
                    event.eventStart.includes("AM") &&
                    eventStartHours === 12
                ) {
                    eventStartHours = 0;
                }
                const eventStartInMinutes =
                    eventStartHours * 60 + eventStartMinutes;

                const [eventEndHourStr, eventEndMinuteStr] =
                    event.eventEnd.split(":");
                let eventEndHours = parseInt(eventEndHourStr);
                const eventEndMinutes = parseInt(eventEndMinuteStr);
                if (event.eventEnd.includes("PM") && eventEndHours !== 12) {
                    eventEndHours += 12;
                } else if (
                    event.eventEnd.includes("AM") &&
                    eventEndHours === 12
                ) {
                    eventEndHours = 0;
                }
                const eventEndInMinutes = eventEndHours * 60 + eventEndMinutes;

                return (
                    timeInMinutes >= eventStartInMinutes &&
                    timeInMinutes < eventEndInMinutes
                );
            });

            const className = hasEvent ? "yesEventDiv" : "noEventDiv";
            const eventForThisTime = eventsForSelectedDate.find((event) => {
                const [eventStartHourStr, eventStartMinuteStr] =
                    event.eventStart.split(":");
                let eventStartHours = parseInt(eventStartHourStr);
                const eventStartMinutes = parseInt(eventStartMinuteStr);
                if (event.eventStart.includes("PM") && eventStartHours !== 12) {
                    eventStartHours += 12;
                } else if (
                    event.eventStart.includes("AM") &&
                    eventStartHours === 12
                ) {
                    eventStartHours = 0;
                }
                const eventStartInMinutes =
                    eventStartHours * 60 + eventStartMinutes;

                const [eventEndHourStr, eventEndMinuteStr] =
                    event.eventEnd.split(":");
                let eventEndHours = parseInt(eventEndHourStr);
                const eventEndMinutes = parseInt(eventEndMinuteStr);
                if (event.eventEnd.includes("PM") && eventEndHours !== 12) {
                    eventEndHours += 12;
                } else if (
                    event.eventEnd.includes("AM") &&
                    eventEndHours === 12
                ) {
                    eventEndHours = 0;
                }
                const eventEndInMinutes = eventEndHours * 60 + eventEndMinutes;

                return (
                    timeInMinutes >= eventStartInMinutes &&
                    timeInMinutes < eventEndInMinutes
                );
            });

            if (hasEvent) {
                eventColor = eventForThisTime.color;
            } else {
                eventColor = "rgb(0,0,0,0)"; //Change this to change bg color
            }

            let newTime = time;
            if (time.length < 8) {
                newTime = "0" + time;
            }
            if (eventForThisTime && eventForThisTime.eventStart != time) {
                console.log(
                    eventForThisTime,
                    eventForThisTime.eventStart,
                    newTime
                );
            }
            return (
                <div className="timeLabelContainer" key={index}>
                    <div className="timeLabel">
                        <h3 className="timeLabelText">{time}</h3>
                    </div>
                    <div
                        className={className}
                        style={{
                            backgroundColor: eventColor,
                        }}
                        onClick={() =>
                            hasEvent && handleEventClick(eventForThisTime)
                        }
                    >
                        {eventForThisTime &&
                            eventForThisTime.eventStart == newTime && (
                                <span className="event-name">
                                    <div className="event-name-part">
                                        <h4>{eventForThisTime.eventName}</h4>
                                    </div>
                                    <div className="event-name-part">
                                        <h6>{eventForThisTime.eventClub}</h6>
                                    </div>
                                </span>
                            )}
                    </div>
                </div>
            );
        });
    };

    // Get the day of the week
    const dayOfWeek = selectedDate.toLocaleDateString(undefined, {
        weekday: "long",
    });

    return (
        <div className="popup-container">
            <div className="popup-content">
                <div className="button-close" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
                <h2>Date: {selectedDate.toLocaleDateString()}</h2>
                <h3>Day: {dayOfWeek}</h3>
                {!selectedEvent && (
                    <div className="time-list">{renderTimes()}</div>
                )}
            </div>
            {selectedEvent && (
                <EventDetailsPopup
                    hallID={hallID}
                    event={selectedEvent}
                    onClose={handleCloseEventPopup}
                />
            )}
        </div>
    );
};

export default Popup;
