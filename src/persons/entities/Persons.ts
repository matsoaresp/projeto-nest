import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'persons' })
export class Persons {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    matricula: string;

    @Column({ type: 'varchar', default: 'aluno' })
    tipo: 'aluno' | 'professor';

    @Column({ default: () => "CURRENT_TIMESTAMP" })
    criadoEm: Date;
}
