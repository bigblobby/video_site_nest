import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {User} from './entity/user.entity';
import {FindOneOptions} from "typeorm";
import {UserRepository} from "./repository/user.repository";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private usersRepository: UserRepository,
    ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(options: FindOneOptions): Promise<User> {
        return this.usersRepository.findOne(options);
    }

    async update(options: FindOneOptions, updateOptions){
        let user = await this.findOne(options);
        for(let prop in updateOptions){
            user[prop] = updateOptions[prop]
        }
        return await this.usersRepository.save(user);
    }

    async create(email: string, password: string): Promise<User> {
        const userEntity = await this.usersRepository.create({
            email: email,
            password: password
        });

        await this.usersRepository.save(userEntity);
        return await this.findOne({where: {email}});
    }
}
