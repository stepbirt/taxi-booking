import { Test } from '@nestjs/testing';
import { AppService } from './app.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { Environments, TopicBroker } from '@taxi-booking-app/common';
import { ClientProxy } from '@nestjs/microservices';
import { BookingStatus } from './enum/booking.enum';
import { BadRequestException } from '@nestjs/common';
import { CreateBookingInstantDto } from './dto/booking.dto';

describe('AppService', () => {
  let service: AppService;
  let bookingRepository: Repository<Booking>;
  let bookClient: ClientProxy;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: getRepositoryToken(Booking),
          useClass: Repository,
        },
        {
          provide: Environments.RMQ_NAME,
          useValue: { emit: jest.fn() },
        },
      ],
    }).compile();

    service = app.get<AppService>(AppService);
    bookingRepository = app.get<Repository<Booking>>(
      getRepositoryToken(Booking)
    );
    bookClient = app.get<ClientProxy>(Environments.RMQ_NAME);
  });

  describe('validateBooking', () => {
    it('should throw an error if user has a pending or confirmed booking', async () => {
      jest.spyOn(bookingRepository, 'findOne').mockResolvedValue({
        id: 1,
        status: BookingStatus.Pending,
        user: { id: 123 },
      } as Booking);

      await expect(service.validateActiveBooking(123)).rejects.toThrow(
        BadRequestException
      );
    });

    it('should not throw an error if user has no pending or confirmed bookings', async () => {
      jest.spyOn(bookingRepository, 'findOne').mockResolvedValue(null);

      await expect(service.validateActiveBooking(123)).resolves.not.toThrow();
    });
  });

  describe('createInstantBooking', () => {
    it('should create a booking successfully', async () => {
      const bookingDto: CreateBookingInstantDto = {
        userId: 123,
        pickupLocation: 'Airport Terminal A',
        destinationLocation: 'Downtown',
      };

      jest.spyOn(service, 'validateActiveBooking').mockResolvedValue(undefined);
      jest.spyOn(bookingRepository, 'create').mockReturnValue({
        id: 1,
        user: { id: 123 },
        pickup_location: 'Airport Terminal A',
        destination_location: 'Downtown',
        status: BookingStatus.Pending,
      } as Booking);
      jest.spyOn(bookingRepository, 'save').mockResolvedValue({
        id: 1,
        user: { id: 123 },
        pickup_location: 'Airport Terminal A',
        destination_location: 'Downtown',
        status: BookingStatus.Pending,
      } as Booking);

      const result = await service.createInstantBooking(bookingDto);
      expect(result).toEqual({
        bookingId: 1,
        message: 'Your booking is pending a taxi assignment.',
        status: BookingStatus.Pending,
      });

      expect(bookClient.emit).toHaveBeenCalledWith(
        TopicBroker.userBooking,
        expect.any(Object)
      );
    });

    it('should throw an error if user already has an active booking', async () => {
      const bookingDto: CreateBookingInstantDto = {
        userId: 123,
        pickupLocation: 'Airport Terminal A',
        destinationLocation: 'Downtown',
      };

      jest
        .spyOn(service, 'validateActiveBooking')
        .mockRejectedValue(new BadRequestException('Overbooking'));

      await expect(service.createInstantBooking(bookingDto)).rejects.toThrow(
        BadRequestException
      );
    });
  });
});
