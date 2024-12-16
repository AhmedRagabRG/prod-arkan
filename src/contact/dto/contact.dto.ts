import { IsNotEmpty, IsString } from "class-validator";

export class CreateContactDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    message: string;

    @IsNotEmpty()
    date: Date;
}
