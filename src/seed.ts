import { NestFactory } from '@nestjs/core';
import { faker } from '@faker-js/faker';
import { AppModule } from 'src/app.module';
import { AuthService } from 'src/auth/auth.service';
import { Auth } from 'src/auth/entities/auth.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const authService = app.get(AuthService);

  for (let i = 0; i < 5; i++) {
    const user = new Auth();
    user.name = faker.name.fullName(); // Generate a full name
    user.email = faker.internet.email(); // Generate a random email
    user.password = faker.internet.password(); // Generate a random password (consider hashing it)

    await authService.create(user);
  }

  await app.close();
}

bootstrap();
