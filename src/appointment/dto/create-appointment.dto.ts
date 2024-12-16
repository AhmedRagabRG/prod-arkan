import { IsNotEmpty, IsString } from "class-validator";

export class CreateAppointmentDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    service: string;

    @IsNotEmpty()
    date: Date;
}
