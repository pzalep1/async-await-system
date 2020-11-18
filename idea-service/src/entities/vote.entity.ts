import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vote {
    @PrimaryGeneratedColumn()
    voteId: number;
    
    @PrimaryColumn()
    userId: number;

    @PrimaryColumn()
    ideaId: number;

    @Column()
    vote: boolean;

}