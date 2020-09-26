import {EntityRepository, InsertResult} from "typeorm";
import {Repository} from "typeorm";
import {EmailVerification} from "../entity/emailVerification.entity";

@EntityRepository(EmailVerification)
export class EmailVerificationRepository extends Repository<EmailVerification> {

    createEntity(data): Promise<InsertResult>{
        return this.createQueryBuilder()
            .insert()
            .into(EmailVerification)
            .values(data)
            .execute();
    }

    updateEntity(id, options){
        return this.createQueryBuilder()
            .update(EmailVerification)
            .set(options)
            .where("id = :id", { id: id })
            .execute();
    }
}
