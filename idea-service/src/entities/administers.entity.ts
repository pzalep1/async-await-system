import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Administers {
    @PrimaryColumn()
    userId: number;

    @PrimaryColumn()
    projectId: number;

}