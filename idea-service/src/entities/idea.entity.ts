import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Idea {
    @PrimaryGeneratedColumn()
    ideaId: number;

    @Column()
    projectId: number;

    @Column()
    userId: number;

    @Column()
    idea: string;

    @Column({default: 'submitted'})
    state: string;

    @Column()
    timestamp: string;

}