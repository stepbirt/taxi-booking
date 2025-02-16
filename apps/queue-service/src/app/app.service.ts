import { Injectable } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';

@Injectable()
export class AppService {
  async handleUserBooking(@Payload() data) {
    console.log(`Booking processed: ${JSON.stringify(data)}`);
    return;
  }
}
