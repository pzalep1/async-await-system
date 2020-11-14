import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column()
    fName: string;

    @Column()
    lName: string;

    @Column()
    email: string;

    @Column()
    password: string;

}