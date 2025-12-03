import { Module } from '@nestjs/common';
import { PersonService } from '../service/person.service';
import { PersonController } from '../controller/person.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persons } from '../entities/Persons';

@Module({
  imports: [TypeOrmModule.forFeature([Persons])],
  controllers: [PersonController],
  providers: [PersonService],
  exports: [PersonService],
})
export class PersonsModule {}
