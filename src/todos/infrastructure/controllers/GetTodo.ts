import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags,
} from '@nestjs/swagger';
import { TodoView } from '../../application/models';
import { QueryTodo } from '../../application/queries';
import { SwaggerTodoView } from '../models';

@ApiUseTags('Todo')
@Controller('todos')
export class GetTodo {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiOperation({ title: 'Retrieves a Todo resource.' })
  @ApiOkResponse({
    description: 'Todo resource response',
    type: SwaggerTodoView,
  })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @Get(':id')
  async withId(@Param('id') id: string): Promise<TodoView> {
    try {
      const view: TodoView = await this.queryBus.execute(QueryTodo.withId(id));

      return view;
    } catch (exception) {
      throw new NotFoundException(exception.message);
    }
  }
}
