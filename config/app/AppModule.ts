import { Module } from '@nestjs/common';
import { TodosModule } from '../todos';

@Module({
  imports: [TodosModule],
})
export class AppModule {}
