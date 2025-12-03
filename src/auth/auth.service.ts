import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PersonService } from 'src/persons/service/person.service';

@Injectable()
export class AuthService {


    constructor(private personsService: PersonService){}

    async singIn(name: string, pass: string): Promise<any>{

        const person = await this.personsService.findOne(name);
        if (!person || person.password !== pass){
            throw new UnauthorizedException();
        }
        const {password, ...result} = person;
        return result;
    }
}
