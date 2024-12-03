import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";
import "../styles/Dashboard.css";
import CalendarComponent from "../components/Calendar.jsx";
import Popup from "../components/Popup.jsx";
import HolidayPopup from "../components/HolidayPopup.jsx";
import EventsData from "../api/fetchEventsData.jsx";
import fetchHolidays from "../api/fetchHolidays.jsx";
import CalendarLegend from "../components/CalendarLegend.jsx";
import DSANote from "../components/DSANote.jsx";

const Dashboard = ({ hallID }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showPopup, setShowPopup] = useState(false);
    const [isHoliday, setIsHoliday] = useState(false);
    const [eventData, setEventData] = useState(null);
    const [holidays, setHolidays] = useState([]);

    const handleDataReceived = (data) => {
        console.log("Data received in Dashboard.jsx:", data);
        if (data) {
            Object.keys(data).forEach((date) => {
                console.log("Date:", date);
                const eventsForDate = data[date];
                eventsForDate.forEach((event) => {
                    console.log("Event Start Time:", event.eventStart);
                    console.log("Event End Time:", event.eventEnd);
                });
            });
            setEventData(data);
        } else {
            console.error("No data received.");
        }
    };

    useEffect(() => {
        const fetchAndSetHolidays = async () => {
            const holidayData = await fetchHolidays();
            setHolidays(holidayData);
        };

        fetchAndSetHolidays();
    }, []);

    useEffect(() => {
        if (eventData) {
            console.log("Updated eventData:", eventData);
        }
    }, [eventData]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const highlightToday = ({ date, view }) => {
        if (view === "month") {
            const oldDateStr = new Date(date);
            oldDateStr.setDate(oldDateStr.getDate() + 1);
            const dateStr = oldDateStr.toISOString().split("T")[0];

            const todayStr = new Date().toISOString().split("T")[0];
            const hasEvent =
                eventData &&
                eventData[dateStr] &&
                eventData[dateStr].length !== 0;

            const isHoliday = holidays.some(
                (holiday) => holiday[1] === dateStr
            );

            const isSunday = date.getDay() === 0;

            if (dateStr === todayStr) {
                return "highlight-today";
            } else if (hasEvent) {
                console.log(dateStr, ":", eventData[dateStr]);
                return "highlight-event";
            } else if (isSunday) {
                return "sunday";
            } else if (isHoliday) {
                return "holiday";
            } else if (date.getMonth() !== selectedDate.getMonth()) {
                return "blur-other-months";
            }
        }
        return null;
    };

    const handleOpenPopup = (date) => {
        const dateStr = date.toISOString().split("T")[0];
        console.log("Selected Date:", dateStr);

        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        const nextDayStr = nextDay.toISOString().split("T")[0];
        console.log("Next Day:", nextDayStr);

        const holidayExists = holidays.some(
            (holiday) => holiday[1] === nextDayStr
        );

        setSelectedDate(date);
        setIsHoliday(holidayExists);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="sidebar-container">
            <Sidebar hallID={hallID} />
            <div className="main-content">
                <EventsData
                    hallID={hallID}
                    onDataReceived={handleDataReceived}
                />
                <CalendarComponent
                    hallID={hallID}
                    selectedDate={selectedDate}
                    onDateChange={handleDateChange}
                    tileClassName={highlightToday}
                    onDateClick={handleOpenPopup}
                    eventData={eventData}
                />
                {showPopup && isHoliday ? (
                    <HolidayPopup
                        hallID={hallID}
                        onClose={handleClosePopup}
                        selectedDate={selectedDate}
                        holidays={holidays}
                    />
                ) : (
                    showPopup && (
                        <Popup
                            hallID={hallID}
                            onClose={handleClosePopup}
                            selectedDate={selectedDate}
                            eventData={eventData}
                        />
                    )
                )}
                <CalendarLegend />
                <DSANote />
            </div>
        </div>
    );
};

export default Dashboard;
