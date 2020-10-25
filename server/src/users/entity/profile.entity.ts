import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from './user.entity';
import {Exclude, Expose} from "class-transformer";
import {Media} from "../../media/entity/media.entity";

const groups = {
    other: 'other',
    all: 'all'
}

export const ProfileSerializationGroups = groups;

@Entity()
export class Profile {
    @Expose({groups: [groups.other, groups.all]})
    @PrimaryGeneratedColumn()
    id: number;

    @Expose({groups: [groups.other, groups.all]})
    @Column({nullable: true})
    username: string;

    @Expose({groups: [groups.all]})
    @Column({nullable: true})
    firstName: string;

    @Expose({groups: [groups.all]})
    @Column({nullable: true})
    lastName: string;

    @Expose({groups: [groups.all]})
    @Column({nullable: true})
    birthday: Date;

    @Expose({groups: [groups.all]})
    @Column({nullable: true})
    phone: string;

    @Exclude()
    @CreateDateColumn()
    createdAt: Date;

    @Exclude()
    @UpdateDateColumn()
    updatedAt: Date;

    @Expose({groups: [groups.all]})
    @OneToOne(type => User, user => user.profile, {cascade: true})
    @JoinColumn()
    user: User

    @Expose({groups: [groups.all]})
    @OneToOne(type => Media, {cascade: true})
    @JoinColumn()
    avatar: Media
}
