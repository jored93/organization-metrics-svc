import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './../entities/organization.entity';
import { IEditOrganizationInput } from '../interfaces/organization.interface';

@Injectable()
export class OrganizationsService {
  private readonly logger = new Logger(OrganizationsService.name);
  constructor(
    @InjectRepository(Organization)
    private organizationRepo: Repository<Organization>,
  ) {}

  async findAll(): Promise<Organization[]> {
    const repositories = this.organizationRepo.find({
      where: { status: 1 },
    });
    if (!repositories) {
      this.logger.debug(`No repositories found`);
      throw new NotFoundException(`No repositories found`);
    }
    return repositories;
  }

  findOne(id: number): Promise<Organization | null> {
    const entity = this.organizationRepo.findOne({
      where: { id_organization: id },
    });

    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }

    return entity;
  }

  findOneByActiveStatus(id: number): Promise<Organization | null> {
    const entity = this.organizationRepo.findOne({
      where: { id_organization: id, status: 1 },
    });

    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }

    return entity;
  }

  async create(organization: Organization) {
    const organizationExist = await this.organizationRepo.findOne({
      where: { name: organization.name, status: 1 },
    });
    if (organizationExist) {
      this.logger.debug(`Organization: ${organization.name} exists already`);
      throw new ConflictException(
        `Organization: ${organization.name} exists already`,
      );
    }
    return this.organizationRepo.save(organization);
  }

  async update(input: IEditOrganizationInput): Promise<Organization> {
    const { id, organization } = input;
    const existingOrganization = await this.organizationRepo.findOne({
      where: { id_organization: id },
    });

    if (!existingOrganization) {
      throw new NotFoundException(`Organization with id ${id} not found`);
    }

    await this.organizationRepo.update(id, organization);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const existingOrganization = await this.organizationRepo.findOne({
      where: { id_organization: id },
    });

    if (!existingOrganization) {
      throw new NotFoundException(`Organization with id ${id} not found`);
    }

    await this.organizationRepo.update(id, { status: 2 });
  }
}
