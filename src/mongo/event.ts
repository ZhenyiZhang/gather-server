import * as Mongoose from 'mongoose';
const repeat = ['Weekly', 'Biweekly', 'Yearly', 'Daily', 'Monthly', 'None'];

const EventSchema = new Mongoose.Schema (
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        start: {
            type: Date,
            required: true
        },
        end: {
            type: Date,
            required: true
        },
        repeat: {
            type: String,
            enum: repeat,
            default: 'none',
            required: true
        },
        repeatNeverEnds: {
            type: Boolean,
            default: false,
            required: false
        },
        repeatEnds: {
            type: Date,
            required: false
        },
        contacts: {
            email: String,
            phone: String,
            link: String
        },
        repeatExceptions: {
            type: [Date],
            default: [],
        },
        Organization: {
            type: Mongoose.Schema.Types.ObjectId,
            required: false,
        },
    });


export default EventSchema;
