import { Type } from "class-transformer"
import { IsNumber, IsString } from "class-validator"

export class CreateProductDto {
    @IsString()
    title: string

    @IsString()
    description: string

    @IsString()
    image: string

    @IsNumber()
    @Type(() => Number)
    price: number
}
