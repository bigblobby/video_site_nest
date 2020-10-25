import {EntityRepository, InsertResult} from "typeorm";
import {Profile} from "../entity/profile.entity";
import {Repository} from "typeorm";
import {ProfileDto} from "../dto/ProfileDto";

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {

    updateProfile(data: ProfileDto): Promise<InsertResult>{
        return this.createQueryBuilder()
            .insert()
            .into(Profile)
            .values(data)
            .orUpdate({ conflict_target: ['userId', 'avatarId'], overwrite: ['username', 'firstName', 'lastName', 'birthday', 'phone', 'userId', 'avatarId'] })
            .execute();
    }
}
