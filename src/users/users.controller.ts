import { Controller, Get, Param, Post, Patch, Delete, Body, Query, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    /*
    * GET /users
    * GET /users/:id
    * POST /users
    * PATCH /users/:id
    * DELETE /users/:id
    * */
    constructor(private usersService: UsersService) { }

    @Get()
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return this.usersService.findAll(role);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }

    @Post()
    create(@Body() user: { name: string, email: string, role: 'INTERN' | 'ADMIN' | 'ENGINEER' }) {
        return this.usersService.create(user);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() userUpdate: { name?: string, email?: string, role?: 'INTERN' | 'ADMIN' | 'ENGINEER' }) {
        return this.usersService.update(id, userUpdate);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.delete(id);
    }
}
