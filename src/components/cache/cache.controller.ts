import { Controller } from '@nestjs/common';
import {CacheService} from './cache.service';

@Controller('cache')
export class CacheController {
  constructor(private cacheService: CacheService) {}

  async cacheStore(path: string, key: string, body: any) {
    return this.cacheService.store(path, key, body);
  }
}
