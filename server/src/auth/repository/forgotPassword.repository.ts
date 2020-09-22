import {EntityRepository, InsertResult} from "typeorm";
import {Repository} from "typeorm";
import {ForgotPassword} from "../entity/forgotPassword.entity";

@EntityRepository(ForgotPassword)
export class ForgotPasswordRepository extends Repository<ForgotPassword> {

    createEntity(data): Promise<InsertResult>{
        return this.createQueryBuilder()
            .insert()
            .into(ForgotPassword)
            .values(data)
            .onConflict(`("email") DO UPDATE SET token = :token`)
            .setParameter("token", data.token)
            .execute();
    }

    // updateEntity(id, options){
    //     return this.createQueryBuilder()
    //         .update(ForgotPassword)
    //         .set(options)
    //         .where("id = :id", { id: id })
    //         .execute();
    // }

    deleteEntity(token){
        return this.createQueryBuilder()
            .delete()
            .from(ForgotPassword)
            .where("token = :token", {token: token})
            .execute();
    }
}
