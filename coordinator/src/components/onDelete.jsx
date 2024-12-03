import deleteEvent from "../api/deleteEvent";

const onDelete = async (hallID, event) => {
    try {
        const response = await deleteEvent({
            hallID: hallID,
            date: event.eventDate,
            eventName: event.eventName,
        });

        if (response.error) {
            console.error("Failed to delete event:", response.error);
        } else {
            console.log("Event deleted from onDelete:", response);
        }
    } catch (error) {
        console.error("Error deleting event:", error);
    }
};

export default onDelete;
