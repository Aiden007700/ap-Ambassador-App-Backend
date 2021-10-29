import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from '../shared/abstract.service';
import { Repository } from 'typeorm';
import { Order } from './entities/order';

@Injectable()
export class OrderService extends AbstractService {
    constructor(@InjectRepository(Order) private readonly orderReposetory: Repository<Order>) {
        super(orderReposetory)
    }
}
