import Event from "../models/Event.js";

// Get all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
};

// Add a new event
export const addEvent = async (req, res) => {
  try {
    console.log(req.body);
    const { title, date, location, description, image } = req.body; // Include image
    const newEvent = new Event({ title, date, location, description, image });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: "Error adding event", error });
  }
};
