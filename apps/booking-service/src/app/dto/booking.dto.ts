import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookingInstantDto {
  @ApiProperty({
    example: 1,
    description: 'User ID of the person booking the taxi',
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: 'Donmuang gate 8', description: 'Pickup location' })
  @IsString()
  @IsNotEmpty()
  pickupLocation: string;

  @ApiProperty({ example: 'AA Capital', description: 'Destination location' })
  @IsString()
  @IsNotEmpty()
  destinationLocation: string;
}
