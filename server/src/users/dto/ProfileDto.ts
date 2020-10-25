import {IsPhoneNumber, IsDate, MinLength, IsOptional} from "class-validator";
import {Media} from "../../media/entity/media.entity";

export class ProfileDto {
    id: number

    @MinLength(1)
    username: string;

    @IsOptional()
    @MinLength(1)
    firstName: string;

    @IsOptional()
    @MinLength(1)
    lastName: string;

    @IsOptional()
    @IsDate()
    birthday: Date;

    @IsOptional()
    @IsPhoneNumber('GB')
    phone: string;

    @IsOptional()
    avatar: Media
}
