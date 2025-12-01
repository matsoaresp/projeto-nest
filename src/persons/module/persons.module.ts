import { Module } from '@nestjs/common';
import { PersonService } from '../service/person.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persons } from '../entities/Persons';

@Module({
  imports: [TypeOrmModule.forFeature([Persons])],
  controllers: [AppController],
  providers: [PersonService],
})
export class PersonsModule {}
