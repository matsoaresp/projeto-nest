import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PersonService } from 'src/persons/service/person.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private personsService: PersonService, // ✅ agora vai funcionar
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const person = await this.personsService.findOne(email);
    if (!person || person.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: person.id, email: person.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
