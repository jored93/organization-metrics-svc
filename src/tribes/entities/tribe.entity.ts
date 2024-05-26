import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Base } from './base.entity';
import { Organization } from '@src/organizations/entities/organization.entity';

@Entity()
export class Tribe extends Base {
  @PrimaryGeneratedColumn({ name: 'id_organization' })
  id_tribe: number;

  @Column({ name: 'status', nullable: false, unique: true })
  status: number;

  @ManyToOne((_type) => Organization, { nullable: false })
  @JoinColumn({
    name: 'id_organization',
    referencedColumnName: 'id_organization',
  })
  organization?: Organization;

  @Column({ name: 'organization_id' })
  id_organization!: number;
}
