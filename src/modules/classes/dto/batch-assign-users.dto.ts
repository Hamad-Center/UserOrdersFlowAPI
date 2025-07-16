import { arrayMaxSize, IsArray, IsOptional, IsString, Validate, ValidateNested, ArrayMaxSize } from "class-validator";
import { Type } from "class-transformer";
import { AssignUserToClassDto } from "./assign-user-to-class.dto";

export class BatchAssignUsersDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AssignUserToClassDto)
    @ArrayMaxSize(1000, {
        message:
            'batch size cannot exceed 1000 assignements'
    })
    assignments: AssignUserToClassDto[];

    @IsOptional()
    @IsString()
    correlationId?: string;
}