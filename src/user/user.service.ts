import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly clientKafka: ClientKafka,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.clientKafka.send('createUser', createUserDto);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async onModuleInit() {
    this.clientKafka.subscribeToResponseOf('createUser');
    await this.clientKafka.connect();
  }
}
