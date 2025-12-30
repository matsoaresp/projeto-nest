import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { PersonService } from 'src/persons/service/person.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Persons } from 'src/persons/entities/Persons';
import * as bcrypt from 'bcrypt';
import { error } from 'node:console';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(Persons)
    private readonly personRepository: Repository<Persons>,
    private personsService: PersonService,
    private jwtService: JwtService,
  ) {}

  // Valida email e senha, retorna usuário + token
  async validatePerson(email: string, password: string): Promise<any> {
    try {
      
    const person = await this.personsService.findOneByEmail(email); // Usando método do service

    if (!person) {
      console.log('[AuthService] Usuário não encontrado:', email);
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    const isPasswordValid = await bcrypt.compare(password, person.password);
    if (!isPasswordValid) {
      console.log('[AuthService] Senha inválida para:', email);
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    console.log('[AuthService] Usuário autenticado:', {
      id: person.id,
      name: person.name,
      email: person.email,
      matricula: person.matricula,
      tipo: person.tipo,
    });

    // Payload JWT
    const payload = { sub: person.id, email: person.email };

    return {
      user: {
        id: person.id,
        name: person.name,
        email: person.email,
        matricula: person.matricula,
        tipo: person.tipo,
      },
      access_token: await this.jwtService.signAsync(payload),
    };
  }catch (error){
    throw new InternalServerErrorException("Erro interno no servidor", error.message)
  }
  }
}
