import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zscxzfhjcpkjswmpppeu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzY3h6ZmhqY3BranN3bXBwcGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU0ODQ5NDQsImV4cCI6MjA0MTA2MDk0NH0.VfWUWGYlVnyv8iytowvDDoUul9syulrbIwZS4k3bRHQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
