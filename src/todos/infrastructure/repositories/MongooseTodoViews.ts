import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { TodoView } from '../../application/models';
import { TodoViews } from '../../application/repositories';
import { NotFoundTodo } from '../../domain/exceptions';
import { MongooseTodoView } from '../models';

@Injectable()
export class MongooseTodoViews implements TodoViews {
  constructor(
    @Inject('TODO_VIEWS') private readonly views: Model<MongooseTodoView>,
  ) {}

  async existsWithId(id: string): Promise<boolean> {
    return this.views.exists({ _id: id });
  }

  async save({ id, title, isCompleted }: TodoView): Promise<void> {
    this.views.bulkWrite([
      {
        deleteOne: {
          filter: {
            _id: id,
          },
        },
      },
      {
        insertOne: {
          document: {
            _id: id,
            title,
            isCompleted,
          },
        },
      },
    ]);
  }

  async all(): Promise<TodoView[]> {
    const mongooseViews = await this.views.find().exec();
    const views = mongooseViews.map(({ _id, title, isCompleted }) => ({
      id: _id,
      title,
      isCompleted,
    }));

    return views;
  }

  /** @throws NotFoundTodo */
  async withId(id: string): Promise<TodoView> {
    try {
      const { _id, title, isCompleted } = await this.views.findById(id).exec();
      const view = {
        id: _id,
        title,
        isCompleted,
      };

      return view;
    } catch (error) {
      throw NotFoundTodo.withId(id);
    }
  }

  async remove({ id }: TodoView): Promise<void> {
    this.views.deleteOne({ _id: id }).exec();
  }
}
