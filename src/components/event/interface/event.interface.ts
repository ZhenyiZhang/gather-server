import {Document} from 'mongoose';

export interface Event extends Document{
  readonly name: string,
  readonly description: string,
  readonly start: Date,
  readonly end: Date,
  readonly repeatEnds: Date,
  readonly repeatNeverEnds: boolean,
  readonly repeat: string,
  readonly contacts: {
    email: string,
    phone: string,
    link: string,
    location: string
  },
  readonly Organization: string,
}