import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import { Base } from '@common/base.entity';
import { Tribe } from '@src/tribes/entities/tribe.entity';

@Entity()
@Unique(['id_organization'])
export class Organization extends Base {
  @PrimaryGeneratedColumn({ name: 'id_organization' })
  id_organization: number;

  @OneToMany(() => Tribe, (tribe) => tribe.organization, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  tribes: Tribe[];

  @Column({ name: 'status', nullable: false, default: 1 })
  status: number;
}
