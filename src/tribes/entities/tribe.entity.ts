import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { Base } from '@common/base.entity';
import { Organization } from '@src/organizations/entities/organization.entity';
import { Repository } from '@src/repositories/entities/repository.entity';

@Entity()
@Unique(['id_tribe'])
export class Tribe extends Base {
  @PrimaryGeneratedColumn({ name: 'id_tribe' })
  id_tribe: number;

  @Column({ name: 'status', nullable: false, default: 1 })
  status: number;

  @ManyToOne(() => Organization, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'id_organization',
    referencedColumnName: 'id_organization',
  })
  organization?: Organization;

  @OneToMany(() => Repository, (repository) => repository.tribe, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  repositories: Repository[];

  @Column({ name: 'id_organization' })
  id_organization!: number;
}
