import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBookingInstantDto } from './dto/booking.dto';
import { InstantBookingResponseDto } from './dto/booking-response.dto';

@ApiTags('Bookings')
@Controller('bookings')
export class AppController {
  constructor(private readonly bookingService: AppService) {}

  @Post('/instant')
  @ApiOperation({ summary: 'Create an instant booking' })
  @ApiResponse({
    description: 'Booking created successfully',
    type: InstantBookingResponseDto,
  })
  async createInstantBooking(@Body() bookingData: CreateBookingInstantDto) {
    return this.bookingService.createInstantBooking(bookingData);
  }
}
