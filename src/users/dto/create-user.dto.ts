import { IsString, IsEmail, IsIn } from 'class-validator';

export class CreateUserDto {
    @IsString()
    name: string;
    @IsEmail()
    email: string;
    @IsIn(['INTERN', 'ADMIN', 'ENGINEER'])
    role: 'INTERN' | 'ADMIN' | 'ENGINEER';
}

