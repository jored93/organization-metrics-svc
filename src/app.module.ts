import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { TribesModule } from './tribes/tribes.module';
import { RepositoriesModule } from './repositories/repositories.module';

@Module({
  imports: [DatabaseModule, OrganizationsModule, TribesModule, RepositoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
