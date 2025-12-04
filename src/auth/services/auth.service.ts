import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PersonService } from 'src/persons/service/person.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Persons } from 'src/persons/entities/Persons';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(Persons)
    private readonly personRepository: Repository<Persons>,
    private personsService: PersonService,
    private jwtService: JwtService,
  ) {}

  async validatePerson(email: string, password: string): Promise<any> {
    const person = await this.personRepository.findOne({
      where: { email },
    });

    if (!person) {
      console.log('[AuthService] Usuário não encontrado:', email);
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, person.password);
    if (!isPasswordValid) {
      console.log('[AuthService] Senha inválida para:', email);
      return null;
    }

    console.log('[AuthService] Usuário autenticado:', {
      id: person.id,
      email: person.email,
    });

    
    const payload = { sub: person.id, email: person.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
