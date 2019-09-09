import { AggregateRoot } from '../../../common/domain/models';
import {
  AddedTodo,
  CompletedTodo,
  RemovedTodo,
  RetitledTodo,
  UncompletedTodo,
} from '../events';
import { TodoId } from './TodoId';
import { TodoTitle } from './TodoTitle';

export class Todo extends AggregateRoot {
  private _title: TodoTitle;
  private _isCompleted: boolean;
  private _isRemoved: boolean;

  static add(id: TodoId, title: TodoTitle): Todo {
    const todo = new this();

    todo._id = id;
    todo._title = title;
    todo._isCompleted = false;
    todo._isRemoved = false;
    todo.apply(AddedTodo.with(id.value, title.value));

    return todo;
  }

  retitle(title: TodoTitle): Todo {
    if (!this.isRemoved && !title.isEqualTo(this.title)) {
      this._title = title;
      this.apply(RetitledTodo.with(this.id.value, this.title.value));
    }

    return this;
  }

  complete(): Todo {
    if (!this.isRemoved && !this.isCompleted) {
      this._isCompleted = true;
      this.apply(CompletedTodo.withId(this.id.value));
    }

    return this;
  }

  uncomplete(): Todo {
    if (!this.isRemoved && this.isCompleted) {
      this._isCompleted = false;
      this.apply(UncompletedTodo.withId(this.id.value));
    }

    return this;
  }

  remove(): Todo {
    if (!this.isRemoved) {
      this._isRemoved = true;
      this.apply(RemovedTodo.withId(this.id.value));
    }

    return this;
  }

  private onAddedTodo({ id, title }: AddedTodo): void {
    this._id = TodoId.fromUuid(id);
    this._title = TodoTitle.fromString(title);
    this._isCompleted = false;
    this._isRemoved = false;
  }

  private onRetitledTodo({ title }: RetitledTodo): void {
    this._title = TodoTitle.fromString(title);
  }

  private onCompletedTodo(event: CompletedTodo): void {
    this._isCompleted = true;
  }

  private onUncompletedTodo(event: UncompletedTodo): void {
    this._isCompleted = false;
  }

  private onRemovedTodo(event: RemovedTodo): void {
    this._isRemoved = true;
  }

  get title(): TodoTitle {
    return this._title;
  }

  get isCompleted(): boolean {
    return this._isCompleted;
  }

  get isRemoved(): boolean {
    return this._isRemoved;
  }

  private constructor() {
    super();
  }
}
