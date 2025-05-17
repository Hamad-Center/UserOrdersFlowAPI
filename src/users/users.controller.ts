import { Controller, Get, Param, Post, Patch, Delete, Body, Query } from '@nestjs/common';
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
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(parseInt(id));
    }

    @Post()
    create(@Body() user: { name: string, email: string, role: 'INTERN' | 'ADMIN' | 'ENGINEER' }) {
        return this.usersService.create(user);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() userUpdate: { name?: string, email?: string, role?: 'INTERN' | 'ADMIN' | 'ENGINEER' }) {
        return this.usersService.update(+id, userUpdate);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.usersService.delete(+id);
    }
}
