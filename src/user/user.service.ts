import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userReposetory: Repository<User>) {}
  
  async save(options) {
    return await this.userReposetory.save(options)
  }

  async findOne(options) {
    return await this.userReposetory.findOne(options)
  }

  async update(id: number, options) {
    return await this.userReposetory.update(id, options)
  }

  async find(options) {
    return await this.userReposetory.find(options)
  }
}
