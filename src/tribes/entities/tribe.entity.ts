import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { Organization } from '../../organizations/entities/organization.entity';
import { Repository } from '../../repositories/entities/repository.entity';

@Entity()
@Unique(['id_tribe'])
export class Tribe {
  @PrimaryGeneratedColumn({ name: 'id_tribe' })
  id_tribe: number;

  @Column({ name: 'name', nullable: false, length: 50 })
  name: string;

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
