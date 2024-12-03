// have fun, my ass
import React, { useState, useEffect } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fetchHolidays from "../api/fetchHolidays";
import "../styles/HolidayPopup.css";

const HolidayPopup = ({ onClose, selectedDate }) => {
    const [holiday, setHoliday] = useState(null);
    const dayOfWeek = selectedDate.toLocaleDateString(undefined, {
        weekday: "long",
    });

    useEffect(() => {
        const fetchHolidayData = async () => {
            const holidayData = await fetchHolidays();
            const incrementedDate = new Date(selectedDate);
            incrementedDate.setDate(incrementedDate.getDate() + 1);
            const formattedDate = incrementedDate.toISOString().split("T")[0];
            const matchedHoliday = holidayData.find(
                (holiday) => holiday[1] === formattedDate
            );

            if (matchedHoliday) {
                setHoliday(matchedHoliday[2]);
            } else {
                setHoliday(null);
            }
        };

        fetchHolidayData();
    }, [selectedDate]);

    return (
        <div className="popup-container2">
            <div className="popup-content2">
                <div className="button-close" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
                <h2>Date: {selectedDate.toLocaleDateString()}</h2>
                <h3>Day: {dayOfWeek}</h3>
                <h3>Holiday: {holiday ? holiday : "No holiday on this day"}</h3>
            </div>
        </div>
    );
};

export default HolidayPopup;
