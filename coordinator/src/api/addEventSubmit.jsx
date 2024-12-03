// addEventSubmit.jsx

const addEventSubmit = async (eventData) => {
    try {
        const response = await fetch("http://localhost:3000/addEvent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(eventData),
        });

        if (!response.ok) {
            throw new Error("Failed to add event");
        }

        const data = await response.json();
        console.log("Event added successfully:", data);
        return data;
    } catch (error) {
        console.error("Error adding event:", error);
        throw error;
    }
};

export default addEventSubmit;
