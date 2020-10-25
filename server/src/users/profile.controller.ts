import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Post,
    Request,
    Param,
    ParseIntPipe,
    UseGuards,
    UseInterceptors,
    SerializeOptions, UploadedFile
} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/guard/jwt-auth.guard";
import {UsersService} from "./users.service";
import {ProfileDto} from "./dto/ProfileDto";
import {ProfileService} from "./profile.service";
import {Profile, ProfileSerializationGroups} from "./entity/profile.entity";
import {RolesGuard} from "../auth/guard/roles.guard";
import {Roles} from "../auth/decorator/roles.decorator";
import {FileInterceptor} from "@nestjs/platform-express";
import {MediaService} from "../media/media.service";
import {Media} from "../media/entity/media.entity";

@Controller('profile')
export class ProfileController {
    constructor(
        private readonly userService: UsersService,
        private readonly profileService: ProfileService,
        private readonly mediaService: MediaService,
    ) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('user')
    @SerializeOptions({groups: [ProfileSerializationGroups.all]})
    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    getOwnerProfile(@Request() req): Promise<Profile>{
        return this.profileService.getProfile({ where: { user: req.user.id }, relations: ['avatar'] });
    }

    @SerializeOptions({groups: [ProfileSerializationGroups.other]})
    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':id')
    getOtherProfile(@Param('id', new ParseIntPipe()) id): Promise<Profile> {
        return this.profileService.getProfile({ where: { user: id } });
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('avatar'))
    @Post('avatar')
    async addAvatar(@Request() req, @UploadedFile() file): Promise<Media>{
        const image = await this.mediaService.createImage(file);
        return this.mediaService.updateAvatar(image, req.user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    updateProfile(@Request() req, @Body() updateProfile: ProfileDto): Promise<Profile>{
        return this.profileService.updateProfile(updateProfile, req.user.id);
    }
}
