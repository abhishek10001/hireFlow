import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();    

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const createSupabaseClient = () => createClient(supabaseUrl, supabaseKey);

export default createSupabaseClient(); 