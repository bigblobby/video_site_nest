import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {MediaRepository} from "./repository/media.repository";
import { MediaService } from './media.service';
import {CloudinaryModule} from "../cloudinary/cloudinary.module";
import {ConfigModule} from "@nestjs/config";
import {UsersModule} from "../users/users.module";
import {ProfileRepository} from "../users/repository/profile.repository";

@Module({
    imports: [
        ConfigModule,
        CloudinaryModule,
        TypeOrmModule.forFeature([MediaRepository, ProfileRepository]),
        UsersModule,
    ],
    providers: [MediaService],
    exports: [MediaService]
})
export class MediaModule {}
