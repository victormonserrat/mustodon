import { ApiModelProperty } from '@nestjs/swagger';
import { TodoView } from '../../application/models';

export class SwaggerTodoView implements TodoView {
  @ApiModelProperty()
  readonly id: string;

  @ApiModelProperty()
  readonly title: string;

  @ApiModelProperty()
  readonly isCompleted: boolean;
}
