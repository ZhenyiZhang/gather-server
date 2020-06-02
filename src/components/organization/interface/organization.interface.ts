import {Document} from 'mongoose';

export interface Organization extends Document{
  readonly name: string,
  readonly organizationName: string,
  readonly description: string,
  readonly events: string[],
  readonly password: string,
  readonly salt: string,
  readonly _id: string,
  readonly share: boolean,
  readonly email: string,
  readonly login: boolean,
  setPassword(),
  validatePassword(password:string): boolean;
}