import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { TribesModule } from './tribes/tribes.module';

@Module({
  imports: [DatabaseModule, OrganizationsModule, TribesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
