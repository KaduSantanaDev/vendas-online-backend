/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity} from './entities/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReturnUserDto } from './dto/returnUser.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}
    async createUser(createUserDto:CreateUserDto): Promise<UserEntity> {
        const saltOrRounds = 10
        
        const passwordHashed = await hash(createUserDto.password, saltOrRounds)
        
        return this.userRepository.save({
            ...createUserDto,
            typeUser: 1,
            password: passwordHashed,
        })
    }
    
    async getAllUsers(): Promise<ReturnUserDto[]> {
        return (await this.userRepository.find()).map((userEntity) => new ReturnUserDto(userEntity))
    }
    
    async findUserById(userId: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            }
        })
        
        if (!user) {
            throw new NotFoundException('userId no found.')
        }
        
        return user
    }

}
