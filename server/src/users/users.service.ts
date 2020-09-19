import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {User} from './entity/user.entity';
import {Repository, FindOneOptions} from "typeorm";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(options: FindOneOptions): Promise<User> {
        return this.usersRepository.findOne(options);
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
