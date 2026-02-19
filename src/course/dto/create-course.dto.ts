import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCourseDto {
     @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    level: string;

    @IsNotEmpty()
    @IsString()
    price: string
    
}
