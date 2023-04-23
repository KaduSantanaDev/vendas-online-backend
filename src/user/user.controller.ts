import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import { CreateUserDto } from './dto/createUser.dto';
  import { ReturnUserDto } from './dto/returnUser.dto';
  import { UserEntity } from './entities/user.entity';
  import { UserService } from './user.service';
  
  @Controller('user')
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    @UsePipes(ValidationPipe)
    @Post()
    async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
      return this.userService.createUser(createUser);
    }
  
    @Get()
    async getAllUser(): Promise<ReturnUserDto[]> {
      return (await this.userService.getAllUser()).map(
        (userEntity) => new ReturnUserDto(userEntity),
      );
    }
  
    @Get('/:userId')
    async getUserById(@Param('userId') userId: number): Promise<ReturnUserDto> {
      return new ReturnUserDto(
        await this.userService.getUserByIdUsingRelations(userId),
      );
    }
  }