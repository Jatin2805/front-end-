import React from "react";
import "../styles/CalendarLegend.css";

const CalendarLegend = () => {
    return (
        <div className="legend">
            <div className="legend-item">
                <span className="legend-color highlight-event"></span>
                <span>Event Booked</span>
            </div>
            <div className="legend-item">
                <span className="legend-color highlight-today"></span>
                <span>Today</span>
            </div>
            <div className="legend-item">
                <span className="legend-color holiday"></span>
                <span>Holiday</span>
            </div>
            <div className="legend-item">
                <span className="legend-color sunday"></span>
                <span>Sunday</span>
            </div>
        </div>
    );
};

export default CalendarLegend;
