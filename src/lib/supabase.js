import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
const isValidUrl = (url) => {
  try {
    new URL(url);
    return url.startsWith('http://') || url.startsWith('https://');
  } catch {
    return false;
  }
};

// Only create client if both URL and key are valid
export const supabase = (supabaseUrl && supabaseKey && isValidUrl(supabaseUrl))
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Log helpful error messages for debugging
if (!supabase) {
  console.warn('Supabase client not initialized. Please check your environment variables:');
  console.warn('VITE_SUPABASE_URL:', supabaseUrl ? (isValidUrl(supabaseUrl) ? 'Valid' : 'Invalid URL format') : 'Missing');
  console.warn('VITE_SUPABASE_ANON_KEY:', supabaseKey ? 'Set' : 'Missing');
  console.warn('Make sure VITE_SUPABASE_URL starts with http:// or https://');
}
