export class CreateOrganizationDto {
  readonly name: string;
  readonly description: string;
  readonly events: [];
  readonly contacts: object;
  public password: string;
  readonly salt: string;
}
