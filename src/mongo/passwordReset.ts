import * as Mongoose from 'mongoose';

const PasswordResetSchema = new Mongoose.Schema (
  {
    Organization: {
      type: Mongoose.Schema.Types.ObjectId,
      required: true
    },
    verification: {
      type: String,
      required: true
    }
  });

export default PasswordResetSchema;