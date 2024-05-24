import mongoose, { Schema } from "mongoose";

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    contact: {
        phone: { type: String },
        email: { type: String, required: true, match: /^\S+@\S+\.\S+$/ }
    },
    thumbnail: { type: String },
    Organizer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    NumberOfVolunteer: { type: Number, default: 0 },
    status: { type: String, enum: ['upcoming', 'completed'], default: 'upcoming' },
    approval: { type: String, enum: ['pending', 'approved'], default: 'pending' }
}, { timestamps: true });

EventSchema.virtual('id').get(function() {
    return this._id;
});

EventSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret) { delete ret._id; }
});

export const EventModel = mongoose.model("Event", EventSchema);

