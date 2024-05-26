import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { Base } from '@common/base.entity';

@Entity()
@Unique(['id_organization'])
export class Organization extends Base {
  @PrimaryGeneratedColumn({ name: 'id_organization' })
  id_organization: number;

  @Column({ name: 'status', nullable: false })
  status: number;
}
