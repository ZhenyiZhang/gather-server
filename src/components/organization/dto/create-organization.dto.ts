
export class CreateOrganizationDto {
  readonly name: string;
  readonly organizationName: string;
  readonly description: string;
  readonly events: [];
  public password: string;
  readonly share: boolean;
  readonly salt: string;
  readonly addONs? : [{field: string, value: string}];
}
