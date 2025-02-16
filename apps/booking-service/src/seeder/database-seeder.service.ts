import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../app/entities/user.entity';
import { Taxi } from '../app/entities/taxi.entity';

@Injectable()
export class DatabaseSeederService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Taxi)
    private readonly taxiRepository: Repository<Taxi>
  ) {}

  async seed() {
    await this.seedUsers();
    await this.seedTaxis();
  }

  private async seedUsers() {
    const users = [
      { name: 'John Doe', phone: '1234567890', email: 'john@example.com' },
      { name: 'Alice Smith', phone: '0987654321', email: 'alice@example.com' },
    ];

    for (const user of users) {
      const exists = await this.userRepository.findOne({
        where: { email: user.email },
      });
      if (!exists) {
        console.log('Seeding user!');
        await this.userRepository.save(user);
        console.log(`Inserted user: ${user.name}`);
      }
    }
  }

  private async seedTaxis() {
    const taxis = [
      {
        driver_name: 'Mike Johnson',
        license_plate: 'ABC-123',
        status: 'available',
      },
      {
        driver_name: 'Sara Lee',
        license_plate: 'XYZ-789',
        status: 'available',
      },
    ];

    for (const taxi of taxis) {
      const exists = await this.taxiRepository.findOne({
        where: { license_plate: taxi.license_plate },
      });
      if (!exists) {
        console.log('Seeding taxi!');
        await this.taxiRepository.save(taxi as Taxi);
        console.log(`Inserted taxi: ${taxi.driver_name}`);
      }
    }
  }
}
