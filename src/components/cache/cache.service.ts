import { Injectable } from '@nestjs/common';
import {OrganizationPopulate} from '../organization/interface/organization.populate.interface'
import * as nodeCache from 'node-cache';

@Injectable()
export class CacheService {

  private cache;

  constructor() {
    this.cache = new nodeCache();
  }

  async store(path: string, key: string, body: any) {
    return this.cache.set(path + key, body);
  }

  getOrganizationProfile(path: string, key: string): OrganizationPopulate {
    return this.cache.get(path + key);
  }

  has(path: string, key: string) {
    return this.cache.has(path + key);
  }

  async delete(path: string, key: string) {
    return new Promise((resolve, reject) => {
      if(!this.cache.has(path + key)) {
        reject('The data is not in the cache');
        return;
      }
      if(this.cache.del(path + key)) {
        resolve('Data has been deleted in cache');
        return;
      }
      this.cache.flushAll();
      reject(new Error('Data has not been deleted successfully'));
      }
    );
  }

}


