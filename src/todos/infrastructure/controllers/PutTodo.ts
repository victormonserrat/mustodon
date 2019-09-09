import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiUseTags,
} from '@nestjs/swagger';
import {
  CompleteTodo,
  RetitleTodo,
  UncompleteTodo,
} from '../../application/commands';
import { NotFoundTodo } from '../../domain/exceptions';
import { PutTodoDTO } from '../models';

@ApiUseTags('Todo')
@Controller('todos')
export class PutTodo {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ title: 'Replaces the Todo resource.' })
  @ApiNoContentResponse({ description: 'Todo resource updated' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @Put(':id')
  @HttpCode(204)
  async withId(
    @Param('id') id: string,
    @Body(ValidationPipe) todoDTO: PutTodoDTO,
  ): Promise<void> {
    try {
      if ('title' in todoDTO) {
        await this.commandBus.execute(RetitleTodo.with(id, todoDTO.title));
      }
      if ('isCompleted' in todoDTO) {
        await this.commandBus.execute(
          todoDTO.isCompleted
            ? CompleteTodo.withId(id)
            : UncompleteTodo.withId(id),
        );
      }
    } catch (exception) {
      if (exception instanceof NotFoundTodo) {
        throw new NotFoundException(exception.message);
      }

      throw new BadRequestException(exception.message);
    }
  }
}
