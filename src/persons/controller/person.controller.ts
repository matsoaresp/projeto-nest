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
            throw new NotFoundException("Erro ao listar Usuários")
        }
    }

    @Post('create')
async createPerson(@Body() createPersonDto: CreateDto) {
  console.log('BODY RECEBIDO:', createPersonDto);
  
  try {
    const response = await this.personService.CreatePerson(createPersonDto);
    return { message: "Usuário criado com sucesso!", data: response };
  } catch (error) {
    console.error('ERRO DENTRO DO SERVICE:', error);
    throw new BadRequestException('Erro ao cadastrar usuário: ' + error.message);
  }
}



    @Get(':id')
    async getPersonById(@Param('id') id: string) {
        const person = await this.personService.getPersonById(Number(id));
        if (!person) {
            throw new NotFoundException("Usuário não encontrado")
        }
        return person;
    }

    @Delete('delete/:id')
    async deletePerson(@Param('id') id: string) {
        try {
            await this.personService.deletePersonById(Number(id));
            return { message: 'Usuary deleted succesfully' };
        } catch (error) {
            throw new NotFoundException("Error to exclude person")
        }
    }

}