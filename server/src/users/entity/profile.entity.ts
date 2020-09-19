import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from './user.entity';

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    username: string;

    @Column({nullable: true})
    firstName: string;

    @Column({nullable: true})
    lastName: string;

    @Column({nullable: true})
    birthday: Date;

    @Column({nullable: true})
    phone: string;

    @OneToOne(type => User, user => user.profile, {cascade: true})
    @JoinColumn()
    user: User
}
