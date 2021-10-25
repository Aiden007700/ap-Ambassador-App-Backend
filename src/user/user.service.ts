import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userReposetory: Repository<User>) {}
  
  save(options) {
    return this.userReposetory.save(options)
  }

  findOne(options) {
    return this.userReposetory.findOne(options)
  }
}
