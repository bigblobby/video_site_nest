import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn} from "typeorm";

@Entity()
export class ForgotPassword {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @Column()
    email: string;

    @CreateDateColumn()
    createdAt: Date;
}
