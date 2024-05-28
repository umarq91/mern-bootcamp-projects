import { EventModel } from "../models/EventModel.js";
import { customError } from "../utils/CustomError.js";

// CRUD on Events 

// admin should get All EVENTS
// Organization should only get their EVENTS

export const createEvent = async (req, res) => {
    try {
        const newEvent = await EventModel.create(req.body);
        // Populate the 'Organizer' field with user details
        const data = await newEvent.populate('Organizer');
        // Send the populated event data in the response
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const deleteEvent = async (req, res) => {
    try {
        const deletedEvent = await EventModel.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const updateEvent = async (req, res) => {
    try {
        const updatedEvent = await EventModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json(updatedEvent);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const getEvents = async (req, res) => {
    try {
     
        const events = await EventModel.find({approval:'approved'})
        res.json(events);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getPersonalEvents = async (req, res) => {
    try {
           let events;

            // Organizations can only get their own events
            events = await EventModel.find({Organizer:req.user._id });
       
        res.json(events);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


// get Events for Admin
export const getPostsForAdmin = async (req, res,next) => {
    try {

    if (req.user.isAdmin) {
        // Admins can get all events
        events = await EventModel.find({approval:'pending'});
    }else{
        return next(customError(403,"You don't have permission to modify this resource!"))
    }
            
} catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
}   
}