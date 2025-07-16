import { IsNumber, IsOptional, IsIn } from "class-validator";

export class AssignUserToClassDto {
    @IsNumber()
    userId: number;

    @IsNumber()
    classId: number;

    @IsOptional()
    @IsIn(['ACTIVE', 'INACTIVE'], {
        message: 'status should be active or inactive'
    })
    status?: 'ACTIVE' | 'INACTIVE' = 'ACTIVE';
}