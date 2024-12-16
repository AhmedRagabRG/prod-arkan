import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateSectionDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsString()
    img?: string

    @IsString()
    content?: string

    @IsNumber()
    sectionId?: number
}
