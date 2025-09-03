import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

    constructor() {
        this.supabase = createClient(
            process.env.SUPABASE_URL ?? '',
            process.env.SUPABASE_ANON_KEY ?? ''
        );
    }

    get client() {
        return this.supabase;
    }

    async addMember(userId: string, name: string, subscription: string) {
        const { data, error } = await this.supabase
            .from('users')
            .insert([{ id: userId, name, subscription }]);

        if (error) throw error;
        return data;
    }

    async getMember(userId: string) {
        const { data, error } = await this.supabase
            .from('users')
            .select('name, subscription')
            .eq('id', userId)
            .single(); // single() ensures we get one row
        if (error) throw error;
        return data;
    }

}
