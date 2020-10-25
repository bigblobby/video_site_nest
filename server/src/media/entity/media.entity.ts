import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn} from "typeorm";
import {Exclude} from "class-transformer";

export enum MediaTypes {
    IMAGE = 'image',
    VIDEO = 'video',
}

@Entity()
export class Media {
    @Exclude()
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    path: string;

    @Column()
    alt: string;

    @Column({type: 'enum', enum: MediaTypes})
    public type: MediaTypes;

    @Exclude()
    @CreateDateColumn()
    createdAt: Date;
}
