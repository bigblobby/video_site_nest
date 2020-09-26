import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, CreateDateColumn} from "typeorm";

@Entity()
export class EmailVerification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @Column()
    email: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({type: "timestamp"})
    expiresAt: Date
}
