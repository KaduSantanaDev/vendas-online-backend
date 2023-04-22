import { CACHE_MANAGER } from '@nestjs/common';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from 'src/city/entities/city.entity';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache,) {}
    
    async getCache<T>(key: string, requestFunction: () => Promise<T>): Promise<T> {
        const allData: T = await this.cacheManager.get(key)
        
        if (allData) {
            return allData;
        }
    
        const data = await requestFunction()
    
        await this.cacheManager.set(key, data);
    
        return data;
    }
    
}
