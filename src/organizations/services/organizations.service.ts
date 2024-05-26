import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './../entities/organization.entity';
import { IEditOrganizationInput } from '../interfaces/organization.interface';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepo: Repository<Organization>,
  ) {}
  findAll() {
    return this.organizationRepo.find();
  }

  findOne(id: number) {
    return this.organizationRepo.findByIds([id]);
  }

  create(organization: Organization) {
    return this.organizationRepo.save(organization);
  }

  async update(input: IEditOrganizationInput) {
    const { id, organization } = input;
    await this.organizationRepo.update(id, organization);
    return this.organizationRepo.findByIds([id]);
  }

  async remove(id: number) {
    await this.organizationRepo.delete(id);
    return {
      message: `Organization with ${id} deleted successfully`,
    };
  }
}
