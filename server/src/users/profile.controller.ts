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
    SerializeOptions
} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/guard/jwt-auth.guard";
import {UsersService} from "./users.service";
import {ProfileDto} from "./dto/ProfileDto";
import {ProfileService} from "./profile.service";
import {Profile, ProfileSerializationGroups} from "./entity/profile.entity";

@Controller('profile')
export class ProfileController {
    constructor(
        private readonly userService: UsersService,
        private readonly profileService: ProfileService
    ) {}

    @UseGuards(JwtAuthGuard)
    @SerializeOptions({groups: [ProfileSerializationGroups.all]})
    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    getOwnerProfile(@Request() req): Promise<Profile>{
        return this.profileService.getProfile({ where: { user: req.user.id } });
    }

    @SerializeOptions({groups: [ProfileSerializationGroups.other]})
    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':id')
    getOtherProfile(@Param('id', new ParseIntPipe()) id): Promise<Profile> {
        return this.profileService.getProfile({ where: { user: id } });
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    updateProfile(@Request() req, @Body() updateProfile: ProfileDto): Promise<Profile>{
        return this.profileService.updateProfile(updateProfile, req.user.id);
    }
}
