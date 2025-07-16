import { IsString, IsNotEmpty, IsOptional, Min, IsNumber } from "class-validator";

export class CreateClassDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @Min(1, { message: 'capacity must be at least 1' })
    capacity: number;

    @IsOptional()
    @IsString()
    description?: string;
}



