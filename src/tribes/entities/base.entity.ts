import { BaseEntity, Column } from 'typeorm';

export abstract class Base extends BaseEntity {
  @Column({ name: 'name', nullable: false, length: 50 })
  name: string;
}
