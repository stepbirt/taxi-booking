import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { TopicBroker } from '@taxi-booking-app/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern(TopicBroker.userBooking)
  async userBooking(@Payload() payload) {
    return this.appService.handleUserBooking(payload);
  }
}
