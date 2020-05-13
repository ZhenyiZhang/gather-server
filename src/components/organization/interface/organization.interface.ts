import {Document} from 'mongoose';

export interface Organization extends Document{
  readonly name: string,
  readonly organizationName: string,
  readonly description: string,
  readonly events: string[],
  readonly contacts: object,
  readonly password: string,
  readonly salt: string,
  readonly _id: string,
  setPassword(),
  validatePassword(password:string): boolean;
}