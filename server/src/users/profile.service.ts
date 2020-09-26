import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FindOneOptions} from "typeorm";
import {Profile} from "./entity/profile.entity";
import {ProfileDto} from "./dto/ProfileDto";
import {UsersService} from "./users.service";
import {ProfileRepository} from "./repository/profile.repository";

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile)
        private profileRepository: ProfileRepository,
        private userService: UsersService,
    ) {}

    async getProfile(options: FindOneOptions): Promise<Profile> {
        return await this.profileRepository.findOne(options);
    }

    async updateProfile(props: ProfileDto, userId): Promise<Profile> {
        const user = await this.userService.findOne({where: {id: userId}})
        const data = {...props, user: user}

        await this.profileRepository.updateProfile(data);
        return this.getProfile({where: {user: userId}});
    }
}
