import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hblarpwdedgzbkigddvy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhibGFycHdkZWRnemJraWdkZHZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzNjMwMjQsImV4cCI6MjA0MzkzOTAyNH0.JRmP9joPy3YSIga3vTDDPANwUwZOIfqpxsurjRvIa-A';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
