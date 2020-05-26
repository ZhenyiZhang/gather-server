import * as mongoose from 'mongoose';
import * as crypto from 'crypto';

const OrganizationSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  organizationName: {
    type: String,
    required: true
  },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      autopopulate: true
    }
  ],
  addOns: [{
    field: {type: String},
    value: {type: String}
    }],
  password: {
    type: String,
    required: true
  },
  share: {
    type: Boolean,
    required: true,
    default: false
  },
  salt: String
});

OrganizationSchema.methods.setPassword = function() {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.password = crypto.pbkdf2Sync(this.password, this.salt, 10000, 512, 'sha512').toString('hex');
};

OrganizationSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.password === hash;
};


export default OrganizationSchema;

