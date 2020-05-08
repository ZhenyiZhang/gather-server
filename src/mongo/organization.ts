import * as mongoose from 'mongoose';
import * as crypto from 'crypto';

const OrganizationSchema = new mongoose.Schema({
  name: {
   type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  events: {
    type: [mongoose.Schema.Types.ObjectId],
    required: false
  },
  contacts: {
    type: Object,
    required: false
  },
  password: {
    type: String,
    required: true
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

