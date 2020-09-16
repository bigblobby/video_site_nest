import {Column, Entity} from "typeorm";

@Entity()
export class Profile {
    @Column()
    username: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;
}
