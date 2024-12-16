import { IsNotEmpty, IsString } from "class-validator";

export class CreateDoctorDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    
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
