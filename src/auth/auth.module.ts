import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PersonsModule } from 'src/persons/module/persons.module';

@Module({
  imports: [PersonsModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
