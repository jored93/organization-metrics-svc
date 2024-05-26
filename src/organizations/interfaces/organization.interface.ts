import { Organization } from '../entities/organization.entity';

export interface IEditOrganizationInput {
  id: number;
  organization: Organization;
}
