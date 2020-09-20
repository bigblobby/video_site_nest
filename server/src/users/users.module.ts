import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersController} from "./users.controller";
import {UsersService} from "./users.service";
import {ProfileController} from "./profile.controller";
import {ProfileService} from "./profile.service";
import {ProfileRepository} from "./repository/profile.repository";
import {UserRepository} from "./repository/user.repository";

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository, ProfileRepository])],
    controllers: [UsersController, ProfileController],
    providers: [UsersService, ProfileService],
    exports: [UsersService]
})
export class UsersModule {}
