import { createClient } from '@supabase/supabase-js';

// Project credentials provided by user
export const SUPABASE_PROJECT_ID = 'ivyvvxbqsxcgohkbbbff';

export const SUPABASE_URL =
  (import.meta as any).env?.VITE_SUPABASE_URL ||
  `https://${SUPABASE_PROJECT_ID}.supabase.co`;

export const SUPABASE_ANON_KEY =
  (import.meta as any).env?.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_uIJPAP40VD-RWJ2ii_sC1w_a7X92QjC';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
  },
});
