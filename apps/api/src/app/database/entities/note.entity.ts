import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity('notes')
export class Note extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text' })
  body: string;

  // Relation to the user who created the note
  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'createdById' })
  createdBy: User;
}
