import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class EmailVerification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @Column()
    email: string;
}
