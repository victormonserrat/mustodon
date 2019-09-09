import { Document } from 'mongoose';
import { SwaggerTodoView } from './SwaggerTodoView';

export interface MongooseTodoView extends Document, SwaggerTodoView {
  readonly id: string;
}
