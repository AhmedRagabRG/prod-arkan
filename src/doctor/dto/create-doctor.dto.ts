import { IsNotEmpty, IsString } from "class-validator";

export class CreateDoctorDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    content: string;
    
    @IsNotEmpty()
    @IsString()
    img: string;

    @IsNotEmpty()
    @IsString()
    specializationId: number;
    
    @IsNotEmpty()
    @IsString()
    days: string;
}
