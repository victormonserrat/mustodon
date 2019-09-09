import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from '../../src/todos/application/commands';
import { QueryHandlers } from '../../src/todos/application/queries';
import { Controllers } from '../../src/todos/infrastructure/controllers';
import { EventHandlers } from '../../src/todos/infrastructure/events';
import { DatabaseModule } from '../database';
import { TodosProviders } from './TodosProviders';

@Module({
  imports: [CqrsModule, DatabaseModule],
  controllers: [...Controllers],
  providers: [
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    ...TodosProviders,
  ],
})
export class TodosModule {}
