import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Base } from '@common/base.entity';
import { Tribe } from '@src/tribes/entities/tribe.entity';

@Entity()
export class Repository extends Base {
  @PrimaryGeneratedColumn({ name: 'id_repository' })
  id_repository: number;

  @Column({ name: 'state', nullable: false, length: 1 })
  state!: string;

  @ManyToOne((_type) => Tribe, { nullable: false })
  @JoinColumn({
    name: 'id_tribe',
    referencedColumnName: 'id_tribe',
  })
  tribe?: Tribe;

  @Column({ name: 'id_tribe' })
  id_tribe!: number;

  @CreateDateColumn({ name: 'create_time', nullable: false })
  create_time!: Date;

  @Column({ name: 'status', nullable: false, length: 1 })
  status!: string;
}
