import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dtos/createAdress.dto';
import { UserService } from 'src/user/user.service';
import { CityService } from 'src/city/city.service';

@Injectable()
export class AddressService {
    constructor (
        @InjectRepository(AddressEntity)
        private readonly addresRepository: Repository<AddressEntity>,
        private readonly userService: UserService,
        private readonly cityService: CityService
    ) {}
    
    async createAddress(createAddressDto: CreateAddressDto, userId: number): Promise<AddressEntity> {
        
        await this.userService.findUserById(userId)
        
        await this.cityService.findCityById(createAddressDto.cityId)
        
        return this.addresRepository.save({
            ...createAddressDto,
            userId
        })
    }
}

