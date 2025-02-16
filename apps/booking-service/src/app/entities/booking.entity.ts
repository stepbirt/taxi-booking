import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { BookingStatus } from '../enum/booking.enum';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;

  @Column({ nullable: true })
  taxi_id: number;

  @Column()
  pickup_location: string;

  @Column()
  destination_location: string;

  @Column({ type: 'timestamp', nullable: true })
  pickup_time: Date;

  @Column({ type: 'timestamp', nullable: true })
  scheduled_time: Date;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.Pending,
  })
  status: BookingStatus;

  @CreateDateColumn()
  created_at: Date;
}
