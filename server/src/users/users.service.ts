import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {User} from './entity/user.entity';
import {Repository} from "typeorm";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(email: string): Promise<User> {
        return this.usersRepository.findOne({where: {email: email}});
    }

    async create(email: string, password: string): Promise<User> {
        const userEntity = await this.usersRepository.create({
            email: email,
            password: password
        });

        await this.usersRepository.save(userEntity);

        const newUser = await this.usersRepository.findOne({where: {email}});

        return newUser;
    }
}
