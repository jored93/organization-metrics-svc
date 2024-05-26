import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Tribe } from './entities/tribe.entity';
import { TribesService } from './services/tribes.service';
import { TribesController } from './controllers/tribes.controller';

import { OrganizationsModule } from '@src/organizations/organizations.module';

@Module({
  imports: [OrganizationsModule, TypeOrmModule.forFeature([Tribe])],
  providers: [TribesService],
  controllers: [TribesController],
})
export class TribesModule {}
