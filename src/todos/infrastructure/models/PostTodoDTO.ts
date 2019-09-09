import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PostTodoDTO {
  @ApiModelProperty()
  @IsString()
  readonly title: string;
}
