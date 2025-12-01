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
        const newPerson = this.personRepository.create({
            ...createPersonDetails,
            criadoEm: new Date(),
        });
        return this.personRepository.save(newPerson);
    }


    async getPersonById(id: number) {
        return this.personRepository.findOne({ where: { id } });
    }

    deletePersonById(id: number): void {
        this.personRepository.delete({ id });
    }

}