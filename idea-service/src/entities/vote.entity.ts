import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vote {
    @PrimaryGeneratedColumn()
    voteId: number;
    
    @Column()
    userId: number;

    @Column()
    ideaId: number;

    @Column()
    vote: boolean;

}