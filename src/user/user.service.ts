import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from '../shared/abstract.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService extends AbstractService {
  constructor (
    @InjectRepository(User) private readonly userReposetory: Repository<User>
  ) {
    super(userReposetory)
  }
}
