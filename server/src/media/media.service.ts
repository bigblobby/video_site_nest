import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {CloudinaryService} from "../cloudinary/cloudinary.service";
import {ConfigService} from "@nestjs/config";
import {MediaRepository} from "./repository/media.repository";
import {ProfileService} from "../users/profile.service";
import {Media, MediaTypes} from "./entity/media.entity";
import {ProfileRepository} from "../users/repository/profile.repository";

@Injectable()
export class MediaService {
    constructor(
        private config: ConfigService,
        private cloudinaryService: CloudinaryService,
        private mediaRepository: MediaRepository,
        private profileRepository: ProfileRepository,
        private profileService: ProfileService,
    ) {}

    async createImage(file){
        try {
            return await this.cloudinaryService.uploadImage(file);
        } catch (err){
            throw new InternalServerErrorException('Something went wrong with cloudinary')
        }
    }

    async updateAvatar(image, userId): Promise<Media> {
        const data = {
            alt: 'an image',
            path: image.secure_url,
            type: MediaTypes.IMAGE
        }

        // Create and save image
        const imageEntity = await this.mediaRepository.create({...data});
        const result = await this.mediaRepository.save(imageEntity);

        // Set new image to relevant profile
        await this.profileService.updateProfileAvatar({avatar: result}, userId);

        return result;
    }
}
