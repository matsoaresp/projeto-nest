import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PersonService } from 'src/persons/service/person.service';

@Injectable()
export class AuthService {

    constructor(private personService: PersonService){}

    async singIn(email: string, pass: string): Promise<any>{
        const person = await this.personService.findOne(email);
        if (!person || person.password !== pass){
            throw new UnauthorizedException();
        }
        const {password, ...result} = person;
        return result;
    }

}
