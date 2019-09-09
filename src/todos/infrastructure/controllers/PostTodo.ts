import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiUseTags,
} from '@nestjs/swagger';
import { AddTodo } from '../../application/commands';
import { TodoView } from '../../application/models';
import { Todos } from '../../domain/repository';
import { PostTodoDTO, SwaggerTodoView } from '../models';

@ApiUseTags('Todo')
@Controller('todos')
export class PostTodo {
  constructor(
    @Inject('Todos') private readonly todos: Todos,
    private readonly commandBus: CommandBus,
  ) {}

  @ApiOperation({ title: 'Creates a Todo resource.' })
  @ApiCreatedResponse({
    description: 'Todo resource created',
    type: SwaggerTodoView,
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @Post()
  async with(@Body(ValidationPipe) { title }: PostTodoDTO): Promise<TodoView> {
    const { value: id } = await this.todos.nextIdentity();

    try {
      await this.commandBus.execute(AddTodo.with(id, title));
    } catch (exception) {
      throw new BadRequestException(exception.message);
    }

    const view = {
      id,
      title: title.trim(),
      isCompleted: false,
    };

    return view;
  }
}
