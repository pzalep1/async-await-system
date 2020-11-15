import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Vote {
    @PrimaryColumn()
    userId: number;

    @PrimaryColumn()
    ideaId: number;

    @Column()
    vote: boolean;

}