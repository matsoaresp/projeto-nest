import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { Persons } from "../entities/Persons";
import { CreatePersonParams } from "../utils/types";


@Injectable()
export class PersonService {

    constructor(
        @InjectRepository(Persons)
        private readonly personRepository: Repository<Persons>,
    ) { }


    getPersons() {
        return this.personRepository.find();
    }

    async CreatePerson(createPersonDetails: CreatePersonParams) {
<<<<<<< Updated upstream
        const newPerson = this.personRepository.create({
            ...createPersonDetails,
            criadoEm: new Date(),
        });
        return this.personRepository.save(newPerson);
=======
    const newPerson = this.personRepository.create({
        name: createPersonDetails.name,
        email: createPersonDetails.email,
        matricula: createPersonDetails.matricula,
        tipo: createPersonDetails.tipo,
        criadoEm: new Date(),
    });

    return this.personRepository.save(newPerson);
}

    async findOne(email: string): Promise<Persons | null>{
        return this.personRepository.findOne({
            where:{email}
        });
>>>>>>> Stashed changes
    }


    async getPersonById(id: number) {
        return this.personRepository.findOne({ where: { id } });
    }

    deletePersonById(id: number): void {
        this.personRepository.delete({ id });
    }

}