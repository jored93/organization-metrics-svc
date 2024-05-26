import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Base } from './base.entity';

@Entity()
export class Organization extends Base {
  @PrimaryGeneratedColumn({ name: 'id_organization' })
  id_organization: number;

  @Column({ name: 'status', nullable: false, unique: true })
  status: number;
}
