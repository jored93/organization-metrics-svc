import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import { Tribe } from '../../tribes/entities/tribe.entity';

@Entity()
@Unique(['id_organization'])
export class Organization {
  @PrimaryGeneratedColumn({ name: 'id_organization' })
  id_organization: number;

  @Column({ name: 'name', nullable: false, length: 50 })
  name: string;

  @OneToMany(() => Tribe, (tribe) => tribe.organization, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  tribes: Tribe[];

  @Column({ name: 'status', nullable: false, default: 1 })
  status: number;
}
