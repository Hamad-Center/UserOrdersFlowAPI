import { IsString, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsEnum(['INTERN', 'ADMIN', 'ENGINEER'], {
        message: 'Role must be either INTERN, ADMIN or ENGINEER'
    })
    role: 'INTERN' | 'ADMIN' | 'ENGINEER';
}

