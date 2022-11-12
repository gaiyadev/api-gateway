import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class TodoService implements OnModuleInit {
  constructor(
    @Inject('TODO_SERVICE')
    private readonly clientKafka: ClientKafka,
  ) {}

  create(createTodoDto: CreateTodoDto) {
    return this.clientKafka.send('createTodo', createTodoDto);
  }

  findAll() {
    return this.clientKafka.send('findAllTodo', '');
  }

  async findOne(id: number) {
    return this.clientKafka.send('findOneTodo', { id: id });
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }

  async onModuleInit() {
    this.clientKafka.subscribeToResponseOf('createTodo');
    this.clientKafka.subscribeToResponseOf('findAllTodo');
    this.clientKafka.subscribeToResponseOf('findOneTodo');
    await this.clientKafka.connect();
  }
}
