import {EntityRepository} from "typeorm";
import {Repository} from "typeorm";
import {Media} from "../entity/media.entity";

@EntityRepository(Media)
export class MediaRepository extends Repository<Media> {

}
