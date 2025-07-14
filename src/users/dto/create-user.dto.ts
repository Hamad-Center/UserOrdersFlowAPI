import { IsString, IsEmail, IsEnum, IsNotEmpty, isNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsEmail()
    email: string;
    @IsEnum(['INTERN', 'ADMIN', 'ENGINEER'], {
        message: 'Role must be either INTERN, ADMIN or ENGINEER'
    })
    role: 'INTERN' | 'ADMIN' | 'ENGINEER';
}

