import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
    @Column()
    userId: number;

    @Column()
    ideaId: number;

    @Column()
    vote: boolean;

}