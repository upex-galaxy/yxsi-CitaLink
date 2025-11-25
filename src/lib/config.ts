
import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  SUPABASE_SERVICE_ROLE_KEY: z.string(),
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
});

const env = envSchema.parse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
});

export const config = {
  supabase: {
    url: env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    serviceRoleKey: env.SUPABASE_SERVICE_ROLE_KEY,
  },
  app: {
    url: env.NEXT_PUBLIC_APP_URL,
  },
};

// Log for debugging in development, but be careful not to expose secrets.
if (process.env.NODE_ENV === 'development') {
  console.log('App config loaded:', {
    supabaseUrl: config.supabase.url ? 'Loaded' : 'Missing',
    supabaseAnonKey: config.supabase.anonKey ? 'Loaded' : 'Missing',
    serviceRoleKey: config.supabase.serviceRoleKey ? 'Loaded' : 'Missing',
    appUrl: config.app.url,
  });
}
