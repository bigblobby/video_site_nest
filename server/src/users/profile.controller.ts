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
    UseInterceptors
} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/guard/jwt-auth.guard";
import {UsersService} from "./users.service";
import {ProfileDto} from "./dto/ProfileDto";
import {ProfileService} from "./profile.service";

@Controller('profile')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class ProfileController {
    constructor(
        private readonly userService: UsersService,
        private readonly profileService: ProfileService
    ) {}

    @Get(':id')
    getProfile(@Param('id', new ParseIntPipe()) id){
        return this.profileService.getProfile({ where: { user: id } });
    }

    @Post()
    updateProfile(@Request() req, @Body() updateProfile: ProfileDto){
        return this.profileService.updateProfile(updateProfile, req.user.id);
    }
}
