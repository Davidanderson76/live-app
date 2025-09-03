import { Body, Controller, Post } from '@nestjs/common';
import { SupabaseService } from '../../../supabase.service';
import { SupabaseUserResponse } from '../../../models/supabase.model';

@Controller('auth')
export class AuthController {
    constructor(private readonly supabaseService: SupabaseService) {}


    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
    // 1️⃣ Authenticate user with Supabase
        const { data: authData, error: authError } = await this.supabaseService.client.auth.signInWithPassword({
            email: body.email,
            password: body.password,
        });

        if (authError) return { success: false, message: authError.message };
        if (!authData?.user) return { success: false, message: 'Login failed' };

        // 2️⃣ Fetch additional member info
        const member = await this.supabaseService.getMember(authData.user.id);

        // 3️⃣ Return combined response
        return {
            success: true,
            user: {
            ...authData.user,
            name: member?.name || null,
            subscription: member?.subscription || 'free',
            },
        };
    }


    @Post('signup')
        async signup(@Body() body: { email: string; password: string; name: string }): Promise<any> {
        const { data: authData, error: authError } = await this.supabaseService.client.auth.signUp({
            email: body.email,
            password: body.password,
        });

        if (authError) return { success: false, message: authError.message };

        if (!authData?.user) {
            // User is null → fail gracefully
            return { success: false, message: 'Signup failed: user not created' };
        }

        await this.supabaseService.addMember(authData.user.id, body.name, 'free');

        return { success: true, user: authData.user };
    }

}
