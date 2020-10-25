import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersController} from "./users.controller";
import {UsersService} from "./users.service";
import {ProfileController} from "./profile.controller";
import {ProfileService} from "./profile.service";
import {ProfileRepository} from "./repository/profile.repository";
import {UserRepository} from "./repository/user.repository";
import {MediaService} from "../media/media.service";
import {CloudinaryService} from "../cloudinary/cloudinary.service";
import {ConfigModule} from "@nestjs/config";
import {MediaRepository} from "../media/repository/media.repository";

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([UserRepository, ProfileRepository, MediaRepository])
    ],
    controllers: [UsersController, ProfileController],
    providers: [UsersService, ProfileService, MediaService, CloudinaryService],
    exports: [UsersService, ProfileService]
})
export class UsersModule {}
