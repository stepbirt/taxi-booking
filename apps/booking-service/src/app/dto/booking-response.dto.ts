import { ApiProperty } from '@nestjs/swagger';
import { BookingStatus } from '../enum/booking.enum';

class TaxiDto {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiProperty({ example: 'John Doe' })
  driverName: string;

  @ApiProperty({ example: 'ABC123' })
  licensePlate: string;

  @ApiProperty({ example: '+1234567890' })
  phone: string;
}

export class InstantBookingResponseDto {
  @ApiProperty({ example: '1' })
  bookingId: string;

  @ApiProperty({ example: BookingStatus.Pending })
  status: string;

  @ApiProperty({ example: 'Your booking is pending a taxi assignment.' })
  message: string;
}
