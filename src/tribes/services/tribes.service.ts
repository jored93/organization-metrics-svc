import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tribe } from './../entities/tribe.entity';
import { IEditTribeInput } from '../interfaces/tribe.interface';
import { OrganizationsService } from '@src/organizations/services/organizations.service';

@Injectable()
export class TribesService {
  private readonly logger = new Logger(TribesService.name);
  constructor(
    private organizationsService: OrganizationsService,
    @InjectRepository(Tribe)
    private tribeRepo: Repository<Tribe>,
  ) {}

  async findAll(): Promise<Tribe[]> {
    const tribes = this.tribeRepo.find();
    if (!tribes) {
      this.logger.debug(`No tribes found`);
      throw new NotFoundException(`No tribes found`);
    }
    return tribes;
  }

  findOne(id: number): Promise<Tribe | null> {
    const entity = this.tribeRepo.findOne({
      where: { id_tribe: id },
      relations: ['organization'],
    });

    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }

    return entity;
  }

  async create(tribe: Tribe): Promise<Tribe> {
    // Check if a tribe with the same name exists
    const tribeExist = await this.tribeRepo.findOne({
      where: { name: tribe.name, status: 1 },
    });

    if (tribeExist) {
      this.logger.debug(`Tribe: ${tribe.name} exists already`);
      throw new ConflictException(`Tribe: ${tribe.name} exists already`);
    }

    // Check if the tribe organization is in status 1
    const organization = await this.organizationsService.findOneByActiveStatus(
      tribe.id_organization,
    );

    if (!organization) {
      this.logger.debug(
        `OrganizationID: ${tribe.id_organization} is not in status 1`,
      );
      throw new ConflictException(
        `OrganizationID: ${tribe.id_organization} is not in status 1`,
      );
    }

    return this.tribeRepo.save(tribe);
  }

  async update(input: IEditTribeInput): Promise<Tribe> {
    const { id, tribe } = input;
    const existingTribe = await this.tribeRepo.findOne({
      where: { id_organization: id },
    });

    if (!existingTribe) {
      throw new NotFoundException(`Tribe with id ${id} not found`);
    }

    await this.tribeRepo.update(id, tribe);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const existingTribe = await this.tribeRepo.findOne({
      where: { id_organization: id },
    });

    if (!existingTribe) {
      throw new NotFoundException(`Tribe with id ${id} not found`);
    }

    await this.tribeRepo.delete(id);
  }
}
