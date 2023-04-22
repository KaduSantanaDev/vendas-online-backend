/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller ,Get,Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @UsePipes(ValidationPipe)
    @Post()
    async createUser(@Body() createUser: CreateUserDto) {
        return this.userService.createUser(createUser)
    }
    
    @Get()
    async getAllUsers() {
        return this.userService.getAllUsers()
    }
}
