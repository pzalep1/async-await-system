import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Member {
    @PrimaryColumn()
    userId: number;

    @PrimaryColumn()
    projectId: number;

}