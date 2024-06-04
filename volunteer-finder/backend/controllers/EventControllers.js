import { EventModel } from "../models/EventModel.js";
import { customError } from "../utils/CustomError.js";

// CRUD on Events 

// admin should get All EVENTS
// Organization should only get their EVENTS
export const createEvent = async (req, res) => {
    try {
        let newEvent;
        if (req.user.isAdmin) {
            newEvent = await EventModel.create({ ...req.body, approval: 'approved' ,Organizer: req.user._id});
        } else {
            newEvent = await EventModel.create({ ...req.body, approval: 'pending', Organizer: req.user._id });
        }

        // Populate the 'Organizer' field with user details
        await newEvent.populate('Organizer');

        // Send the populated event data in the response
        res.status(200).json(newEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const getEventDetails = async (req, res) => {
    try {
        console.log("testing");
        const event = await EventModel.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json(event);
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
        

            // Organizations can only get their own events
        let    events = await EventModel.find({Organizer:req.user._id });
       
        res.json(events);
    
    } catch (error) {
        console.log("sd" );
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


// get Events for Admin
export const getPostsForAdmin = async (req, res,next) => {
    try {

    if (req.user.isAdmin) {
        // Admins can get all events
        console.log("coming");
       let  events = await EventModel.find({approval:'pending'});
       res.json(events)
    }else{
        return next(customError(403,"You don't have permission to modify this resource!"))
    }
            
} catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
}   
}

export const eventPermission = async (req, res, next) => {
    const { id } = req.params;
    const { action } = req.body; // 'approve' or 'reject'

    try {
        if (req.user.isAdmin) {
            let update;
            if (action === 'approve') {
                update = { approval: 'approved' };
            } else if (action === 'reject') {
                update = { approval: 'rejected' };
            } else {
                return next(customError(400, "Invalid action specified!"));
            }

            const event = await EventModel.findByIdAndUpdate(id, { $set: update }, { new: true });
            if (!event) {
                return next(customError(404, "Event not found!"));
            }
            res.status(200).json({message: "Event updated successfully!"});
        } else {
            return next(customError(403, "You don't have permission to modify this resource!"));
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
