import { Controller, Get, Param, Post, Patch, Delete, Body, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UsersController {
    /*
    * GET /users
    * GET /users/:id
    * POST /users
    * PATCH /users/:id
    * DELETE /users/:id
    * */
    constructor(private readonly usersService: UsersService) { }

    @Get() // get /users or /users?role=value
    findAll(@Query('role') role?: 'INTERN' | 'ADMIN' | 'ENGINEER') {
        return this.usersService.findAll(role);
    }

    @Get(':id') // this is a get requst GET /users/:id
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }

    @Post() // POST /users
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Patch(':id') // patch /users/:id   
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id') // delete /users/:id   
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.delete(id);
    }
} 