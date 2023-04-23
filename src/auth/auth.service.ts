import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { LoginDto } from './dtos/login.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { ReturnLoginDto } from './dtos/returnLogin.dto';
import { ReturnUserDto } from 'src/user/dto/returnUser.dto';
import { LoginPayloadDto } from './dtos/loginPayload.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    
    constructor(private readonly userService: UserService, private jwtService: JwtService){}
    
    async login(loginDto: LoginDto): Promise<ReturnLoginDto> {
        const user: UserEntity | undefined= await this.userService.findUserByEmail(loginDto.email).catch(() => undefined)
        
        const isMatch = await compare(loginDto.password, user?.password || '')
        
        if(!user || !isMatch) {
            throw new NotFoundException('Invalid email or password.')
        }
        
        return {
            accessToken: this.jwtService.sign({...new LoginPayloadDto(user)}),
            user: new ReturnUserDto(user),
        }
    }
}
