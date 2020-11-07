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

    findOne(options: FindOneOptions): Promise<Profile | undefined> {
        return this.profileRepository.findOne(options);
    }

    async getProfile(options: FindOneOptions): Promise<Profile> {
        return await this.profileRepository.findOne(options);
    }

    async update(props, userId){
        const user = await this.userService.findOne({where: {id: userId}})
        const profile = await this.getProfile({ where: { user: userId }, relations: ['avatar'] });
        const data = {...profile, ...props, user: userId};

        await this.profileRepository.updateProfile(data);

        return this.getProfile({where: {user: userId}});
    }

    async updateProfile(props: ProfileDto, userId): Promise<Profile> {
        return this.update(props, userId);
    }

    async updateProfileAvatar(props, userId): Promise<Profile>{
        return this.update(props, userId);
    }
}
