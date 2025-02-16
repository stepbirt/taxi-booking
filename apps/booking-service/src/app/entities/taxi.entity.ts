import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('taxis')
export class Taxi {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  driver_name: string;

  @Column({ unique: true })
  license_plate: string;

  @Column({
    type: 'enum',
    enum: ['available', 'on_trip'],
    default: 'available',
  })
  status: 'available' | 'on_trip';

  @CreateDateColumn()
  created_at: Date;
}
