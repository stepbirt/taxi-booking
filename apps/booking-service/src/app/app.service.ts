import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Environments, TopicBroker } from '@taxi-booking-app/common';
import { CreateBookingInstantDto } from './dto/booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { In, Repository } from 'typeorm';
import { BookingStatus } from './enum/booking.enum';

@Injectable()
export class AppService {
  constructor(
    @Inject(Environments.RMQ_NAME) private readonly bookClient: ClientProxy,
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>
  ) {}

  async validateActiveBooking(userId: number) {
    const activeBooking = await this.bookingRepository.findOne({
      where: {
        user: {
          id: userId,
        },
        status: In([
          BookingStatus.Pending,
          BookingStatus.Confirmed,
          BookingStatus.Scheduled,
        ]),
      },
    });
    if (activeBooking) throw new BadRequestException('Over booking');
  }

  async createInstantBooking(createBookingInstantDto: CreateBookingInstantDto) {
    const { userId, pickupLocation, destinationLocation } =
      createBookingInstantDto;

    await this.validateActiveBooking(userId);

    const booking = this.bookingRepository.create({
      user: { id: userId },
      pickup_location: pickupLocation,
      destination_location: destinationLocation,
    });

    await this.bookingRepository.save(booking);

    this.bookClient.emit(TopicBroker.userBooking, {
      bookingId: booking.id,
      userId,
      pickupLocation,
      destinationLocation,
    });

    return {
      bookingId: booking.id,
      status: booking.status,
      message: 'Your booking is pending a taxi assignment.',
    };
  }
}
