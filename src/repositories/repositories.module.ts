import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Repository } from './entities/repository.entity';
import { RepositoriesService } from './services/repositories.service';
import { RepositoriesController } from './controllers/repositories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Repository])],
  providers: [RepositoriesService],
  controllers: [RepositoriesController],
  exports: [RepositoriesService],
})
export class RepositoriesModule {}
