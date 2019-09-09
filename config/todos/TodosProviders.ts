import { Connection, Schema } from 'mongoose';
import {
  EventStoreTodos,
  MongooseTodoViews,
} from '../../src/todos/infrastructure/repositories';

export const TodosProviders = [
  {
    provide: 'TODO_VIEWS',
    useFactory: ({ model }: Connection) =>
      model(
        'Todo',
        new Schema(
          {
            _id: String,
            title: String,
            isCompleted: Boolean,
          },
          { versionKey: false },
        ),
      ),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'Todos',
    useClass: EventStoreTodos,
  },
  {
    provide: 'TodoViews',
    useClass: MongooseTodoViews,
  },
];
