import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    projectId: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    color: string;

}