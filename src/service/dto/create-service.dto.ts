import { IsNotEmpty, IsString } from "class-validator"

export class CreateServiceDto {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    img: string

    @IsString()
    content?: string
}
