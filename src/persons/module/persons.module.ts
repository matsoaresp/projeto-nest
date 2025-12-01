import { Module } from '@nestjs/common';
import { PersonService } from '../service/person.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persons } from '../entities/Persons';
import { PersonController } from '../controller/person.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Persons])],
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonsModule {}
