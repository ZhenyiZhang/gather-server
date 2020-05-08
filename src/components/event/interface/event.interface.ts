import {Document} from 'mongoose';

export interface Event extends Document{
  readonly name: string,
  readonly description: string,
  readonly start: Date,
  readonly end: Date,
  readonly repeat: string,
  readonly contact: object,
  readonly Organization: string,
}