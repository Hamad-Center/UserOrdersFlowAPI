import { CreateClassDto } from "../dto/create-class.dto"
import { IClass } from "../interfaces/class.interface"

export interface IClassRepository {
    create(createClassDto: CreateClassDto): Promise<IClass>;
}