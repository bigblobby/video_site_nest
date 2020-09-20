import {Entity, Column, PrimaryGeneratedColumn, OneToOne} from "typeorm";
import {Exclude} from "class-transformer";
import {Profile} from "./profile.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({default: false})
    verified: boolean;

    @OneToOne(type => Profile, profile => profile.user)
    profile: Profile;
}
