import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xyzcompany.supabase.co';
const supabaseAnonKey = 'public-anonymous-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);