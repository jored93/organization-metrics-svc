import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { TribesModule } from './tribes/tribes.module';
import { RepositoriesModule } from './repositories/repositories.module';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [DatabaseModule, OrganizationsModule, TribesModule, RepositoriesModule, MetricsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
