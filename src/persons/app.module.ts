import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persons } from './entities/Persons';
import { PersonsModule } from './module/persons.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',   
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'nestjs',
      entities: [Persons],
      synchronize: true,
    }),
    PersonsModule,
  ],
})
export class AppModule {}
