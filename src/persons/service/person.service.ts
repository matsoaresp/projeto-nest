import { Injectable, InternalServerErrorException } from "@nestjs/common";
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
    ) { }

    // Retorna todas as pessoas
    async getPersons() {
        try {
            return await this.personRepository.find();
        } catch(error) {
            throw new InternalServerErrorException("Erro ao buscar todos os usuarios", error.message)
        }

    }

    // Cria uma nova pessoa com a senha hashada
    async CreatePerson(createPersonDetails: CreatePersonParams) {

        try {
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
        } catch(error) {
            throw new InternalServerErrorException("Erro ao criar usuário", error.message)
        }


    }

    // Busca uma pessoa pelo email
    async findOneByEmail(email: string): Promise<Persons | null> {
        return this.personRepository.findOne({
            where: { email },
        });
    }

    // Busca uma pessoa pelo id
    async getPersonById(id: number) {
        try {
            return await this.personRepository.findOne({ where: { id } });
        } catch(error) {
            throw new InternalServerErrorException("Erro ao encontrar usuário", error.message)
        }

    }

    // Remove pessoa pelo id
    async deletePersonById(id: number): Promise<void> {

        try {
            await this.personRepository.delete({ id });
        } catch(error) {
            throw new InternalServerErrorException("Falha ao deletar usuários", error.message)
        }
    }

    async updatePerson(id: number, data: Partial<Persons>): Promise<Persons> {
        try {
            await this.personRepository.update(id,data)

            const updatePerson = await this.personRepository.findOne({
                where: {id},
            })

            if( !updatePerson){
                throw new Error('Usuários não encontrado')
            }
            return updatePerson
        }catch(error){
            throw new InternalServerErrorException(
                'Erro ao atualizar usuário',
                error.message
            );
        }
    }
}