import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { TodoView } from '../../application/models';
import { QueryTodos } from '../../application/queries';
import { SwaggerTodoView } from '../models';

@ApiUseTags('Todo')
@Controller('todos')
export class GetTodos {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiOperation({ title: 'Retrieves the collection of Todo resources.' })
  @ApiOkResponse({
    description: 'Todo collection response',
    type: SwaggerTodoView,
    isArray: true,
  })
  @Get()
  async with(): Promise<TodoView[]> {
    const views: TodoView[] = await this.queryBus.execute(QueryTodos.with());

    return views;
  }
}
