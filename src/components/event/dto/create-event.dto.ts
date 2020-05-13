export class CreateEventDto {
  readonly _id: string;
  readonly name: string;
  readonly description: string;
  readonly start: Date;
  readonly end: Date;
  readonly repeat: string;
  readonly contact: object;
  readonly Organization: string;
}