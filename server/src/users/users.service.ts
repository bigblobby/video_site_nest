import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import {UserInterface} from './interfaces/user.interface';
import {User} from './users.entity';
import {Repository} from "typeorm";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    getAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async create(username: string, password: string): Promise<User> {
        const userEntity = await this.usersRepository.create({
            username: username,
            password: password
        });

        await this.usersRepository.save(userEntity);

        const newUser = this.usersRepository.findOne({where: {username}});

        console.log(newUser);
        return newUser;
    }
}
