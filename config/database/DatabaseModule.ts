import { Module } from '@nestjs/common';
import { DatabaseProviders } from './DatabaseProviders';

@Module({
  providers: [...DatabaseProviders],
  exports: [...DatabaseProviders],
})
export class DatabaseModule {}
