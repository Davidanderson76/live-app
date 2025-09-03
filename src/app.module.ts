import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './live-users/controllers/users/users.controller';
import { AuthController } from './live-users/controllers/login/login.controller';
import { SupabaseService } from './supabase.service';

@Module({
  imports: [],
  controllers: [AppController, UsersController, AuthController],
  providers: [AppService, SupabaseService],
})
export class AppModule {}
