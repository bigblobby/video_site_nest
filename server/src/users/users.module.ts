import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from './entity/user.entity';
import {UsersController} from "./users.controller";
import {UsersService} from "./users.service";
import {ProfileController} from "./profile.controller";
import {ProfileService} from "./profile.service";
import {ProfileRepository} from "./repository/profile.repository";

@Module({
    imports: [TypeOrmModule.forFeature([User, ProfileRepository])],
    controllers: [UsersController, ProfileController],
    providers: [UsersService, ProfileService],
    exports: [UsersService]
})
export class UsersModule {}
