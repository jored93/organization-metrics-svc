import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tribe } from './../entities/tribe.entity';
import { IEditTribeInput } from '../interfaces/tribe.interface';

@Injectable()
export class TribesService {
  constructor(
    @InjectRepository(Tribe)
    private tribeRepo: Repository<Tribe>,
  ) {}
  findAll() {
    return this.tribeRepo.find();
  }

  findOne(id: number) {
    return this.tribeRepo.findByIds([id]);
  }

  create(tribe: Tribe) {
    return this.tribeRepo.save(tribe);
  }

  async update(input: IEditTribeInput) {
    const { id, tribe } = input;
    await this.tribeRepo.update(id, tribe);
    return this.tribeRepo.findByIds([id]);
  }

  async remove(id: number) {
    await this.tribeRepo.delete(id);
    return {
      message: `Organization with ${id} deleted successfully`,
    };
  }
}
