import {EntityRepository, InsertResult} from "typeorm";
import {Repository} from "typeorm";
import {User} from "../entity/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    createOrUpdate(data): Promise<InsertResult>{
        return this.createQueryBuilder()
            .insert()
            .into(User)
            .values(data)
            .orUpdate({ overwrite: ['verified', 'password'] })
            .execute();
    }
}
