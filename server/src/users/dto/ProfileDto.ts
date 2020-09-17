import {IsPhoneNumber, IsDate, MinLength, IsOptional} from "class-validator";

export class ProfileDto {
    @IsOptional()
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
}
