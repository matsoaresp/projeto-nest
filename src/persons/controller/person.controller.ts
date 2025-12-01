import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Post, Param } from "@nestjs/common";
import { PersonService } from "../service/person.service";
import { CreateDto } from "../dto/CreatePerson";

@Controller('persons')
export class PersonController {

    constructor(private readonly personService: PersonService) { }


    @Get('all')
    getPersons() {
        try {
            return this.personService.getPersons();
        } catch (error) {
            throw new NotFoundException("Erro ao listar Personas")
        }
    }

    @Post('create')
    async createPerson(@Body() createPersonDto: CreateDto) {
        try {
            await this.personService.CreatePerson(createPersonDto)
            return { message: "Persona criada com sucesso!" }
        } catch (error) {
            throw new BadRequestException('Erro ao cadastrar usuário')
        }
    }


    @Get(':id')
    async getPersonById(@Param('id') id: string) {
        const person = await this.personService.getPersonById(Number(id));
        if (!person) {
            throw new NotFoundException("Persona não encontrada")
        }
        return person;
    }

    @Delete('delete/:id')
    async deletePerson(@Param('id') id: string) {
        try {
            await this.personService.deletePersonById(Number(id));
            return { message: 'Person deleted succesfully' };
        } catch (error) {
            throw new NotFoundException("Error to exclude person")
        }
    }

}