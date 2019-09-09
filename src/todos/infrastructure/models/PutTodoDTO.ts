import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class PutTodoDTO {
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  readonly title?: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly isCompleted?: boolean;
}
