import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    commentId: number;

    @Column()
    userId: number;

    @Column()
    ideaId: number;

    @Column()
    comment: string;

    @Column()
    timestamp: string;

}