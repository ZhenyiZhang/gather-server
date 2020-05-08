import * as Mongoose from 'mongoose';
const repeat = ['weekly', 'biweekly', 'yearly', 'daily', 'monthly', 'none'];

const EventSchema = new Mongoose.Schema (
  {
    name: {
      type: String
    },
    description: {
      type: String
    },
    start: {
      type: Date
    },
    end: {
      type: Date
    },
    repeat: {
      type: String,
      enum: repeat,
      default: 'none'
    },
    contact: {
      type: Object,
      required: false
    },
    Organization: {
      type: Mongoose.Schema.Types.ObjectId,
      required: false
    },
  });


export default EventSchema;
