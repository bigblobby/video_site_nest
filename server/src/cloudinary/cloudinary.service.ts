import { Injectable } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import * as cloudinary from 'cloudinary';

@Injectable()
export class CloudinaryService {
    constructor(
        private config: ConfigService
    ) {}

    uploadImage(image){
        const cloudName = this.config.get('CLOUDINARY_CLOUD_NAME');
        const apiKey = this.config.get('CLOUDINARY_API_KEY');
        const apiSecret = this.config.get('CLOUDINARY_API_SECRET');
        cloudinary.v2.config({
            cloud_name: cloudName,
            api_key: apiKey,
            api_secret: apiSecret,
        });

        let buff = new Buffer(image.buffer);
        let base64data = `data:${image.mimetype};base64,${buff.toString('base64')}`;

        return new Promise((resolve, reject) => {
            cloudinary.v2.uploader.upload(
                base64data,
                {
                    transformation: [{
                        width: 200,
                        height: 200,
                        crop: "fit",
                    }],
                    overwrite: true,
                    invalidate: true,
                },
                (error, result) => {
                    if(error) reject(error);
                    resolve(result);
                }
            );
        })
    }
}
