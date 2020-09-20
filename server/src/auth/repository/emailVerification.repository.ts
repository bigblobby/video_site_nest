import {EntityRepository, InsertResult} from "typeorm";
import {Repository} from "typeorm";
import {EmailVerification} from "../entity/emailVerification.entity";

@EntityRepository(EmailVerification)
export class EmailVerificationRepository extends Repository<EmailVerification> {

    // TODO somehow combine create and update
    createEntity(data): Promise<InsertResult>{
        return this.createQueryBuilder()
            .insert()
            .into(EmailVerification)
            .values(data)
            .onConflict(`("email") DO UPDATE SET token = :token`)
            .setParameter("token", data.token)
            // .orUpdate({ conflict_target: ['email'], overwrite: ['token', 'email'] })
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
