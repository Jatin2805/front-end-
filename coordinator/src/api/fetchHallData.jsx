import React, { useEffect } from "react";

const HallData = ({ hallID, onDataReceived }) => {
    useEffect(() => {
        const fetchHallDetails = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/hallDetails/${hallID}`
                );
                const data = await response.json();
                console.log(`Hall ID: ${hallID}`);
                console.log("Hall Details Data:", data);
                onDataReceived(data);
            } catch (error) {
                console.error("Error fetching hall details:", error);
            }
        };

        fetchHallDetails();
    }, [hallID, onDataReceived]);

    return null;
};

export default HallData;
