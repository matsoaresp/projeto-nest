import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { Persons } from "../entities/Persons";
import { CreatePersonParams } from "../utils/types";
import * as bcrypt from 'bcrypt';

@Injectable()
export class PersonService {

    constructor(
        @InjectRepository(Persons)
        private readonly personRepository: Repository<Persons>,
    ) {}

    // Retorna todas as pessoas
    getPersons() {
        return this.personRepository.find();
    }

    // Cria uma nova pessoa com a senha hashada
    async CreatePerson(createPersonDetails: CreatePersonParams) {
        // Hash da senha
        const hashedPassword = await bcrypt.hash(createPersonDetails.password, 10);

        const newPerson = this.personRepository.create({
            name: createPersonDetails.name,
            email: createPersonDetails.email,
            matricula: createPersonDetails.matricula,
            password: hashedPassword, // senha já hashada
            tipo: createPersonDetails.tipo,
            criadoEm: new Date(),
        });

        return this.personRepository.save(newPerson);
    }

    // Busca uma pessoa pelo email
    async findOneByEmail(email: string): Promise<Persons | null> {
        return this.personRepository.findOne({
            where: { email },
        });
    }

    // Busca uma pessoa pelo id
    async getPersonById(id: number) {
        return this.personRepository.findOne({ where: { id } });
    }

    // Remove pessoa pelo id
    async deletePersonById(id: number): Promise<void> {
        await this.personRepository.delete({ id });
    }
}
