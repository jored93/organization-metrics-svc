import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Base } from '@common/base.entity';
import { Organization } from '@src/organizations/entities/organization.entity';

@Entity()
@Unique(['id_tribe'])
export class Tribe extends Base {
  @PrimaryGeneratedColumn({ name: 'id_tribe' })
  id_tribe: number;

  @Column({ name: 'status', nullable: false })
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

  @Column({ name: 'id_organization' })
  id_organization!: number;
}
