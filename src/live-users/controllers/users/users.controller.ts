import { Body, Controller, Get, Post } from '@nestjs/common';
import type { UserModel } from '../../models/user.model';

@Controller('users')
export class UsersController {
    @Get()
        getUser(): string {
        return 'hello user';
    }

    @Post()
    createUser(@Body() body: UserModel): string {
        const { username, email, password } = body;
        // In a real app, you'd save the user to a database here
        return `User created: ${username}, ${email} with password ${password}`;
  }
}
