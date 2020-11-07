import {IsDate, MinLength, IsOptional, IsMobilePhone} from "class-validator";
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
    @IsMobilePhone('en-GB')
    phone: string;

    @IsOptional()
    avatar: Media
}
