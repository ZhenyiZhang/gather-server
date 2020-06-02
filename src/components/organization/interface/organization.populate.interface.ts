import {Document} from 'mongoose';
import {Event} from '../../event/interface/event.interface';

export interface OrganizationPopulate extends Document{
    readonly name: string,
    readonly organizationName: string,
    readonly description: string,
    readonly events: Event[],
    readonly password: string,
    readonly salt: string,
    readonly _id: string,
    readonly share: boolean,
    readonly email: string,
    readonly login: boolean,
    setPassword(),
    validatePassword(password:string): boolean;
}