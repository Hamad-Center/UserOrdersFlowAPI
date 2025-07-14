import { Transform } from 'class-transformer';
import { IsString, IsEmail, IsEnum, IsNotEmpty, isIn, IsIn } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsEmail()
    email: string;
    @Transform(({ value }) => value?.toUpperCase())
    @IsIn(['INTERN', 'ADMIN', 'ENGINEER'], {
        message: 'Role must be either INTERN, ADMIN or ENGINEER'
    })
    role: 'INTERN' | 'ADMIN' | 'ENGINEER';
}

