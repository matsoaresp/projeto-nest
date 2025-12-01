import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'persons' })
export class Persons {


    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    email: string;

    @Column()
    matricula: string;

    @Column({ default: new Date() })
    criadoEm: Date;


}