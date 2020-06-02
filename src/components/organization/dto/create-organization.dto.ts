
export class CreateOrganizationDto {
  readonly name: string;
  readonly organizationName: string;
  readonly description: string;
  readonly events: string[];
  public password: string;
  readonly share: boolean;
  readonly salt: string;
  readonly email: string;
  readonly login: boolean;
}
