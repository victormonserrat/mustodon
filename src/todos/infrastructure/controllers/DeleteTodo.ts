import {
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiUseTags,
} from '@nestjs/swagger';
import { RemoveTodo } from '../../application/commands';

@ApiUseTags('Todo')
@Controller('todos')
export class DeleteTodo {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ title: 'Removes the Todo resource.' })
  @ApiNoContentResponse({ description: 'Todo resource deleted' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @Delete(':id')
  @HttpCode(204)
  async withId(@Param('id') id: string): Promise<void> {
    try {
      await this.commandBus.execute(RemoveTodo.withId(id));
    } catch (exception) {
      throw new NotFoundException(exception.message);
    }
  }
}
