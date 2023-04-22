import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dtos/createAdress.dto';

@Injectable()
export class AddressService {
    constructor (@InjectRepository(AddressEntity) private readonly addresRepository: Repository<AddressEntity>) {}
    
    async createAddress(createAddressDto: CreateAddressDto, userId: number): Promise<AddressEntity> {
        return this.addresRepository.save({
            ...createAddressDto,
            userId
        })
    }
}

