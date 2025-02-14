import { z } from 'zod';

console.log("🔍 Loading environment variables...");
console.log("Process ENV:", process.env); // Log all environment variables

const envSchema = z.object({
  AUTH_SECRET: z.string().min(1, 'AUTH_SECRET is required'),

  // DEV: z.preprocess((val) => val === 'true', z.boolean()),

  // EMAIL_PROVIDER_TOKEN: z.string().min(1, 'EMAIL_PROVIDER_TOKEN is required'),

  // EMAIL_SERVER_HOST: z.string().min(1, 'EMAIL_SERVER_HOST is required'),
  // EMAIL_SERVER_PORT: z.preprocess((val) => Number(val), z.number().int().positive()),
  // EMAIL_SERVER_USER: z.string().min(1, 'EMAIL_SERVER_USER is required'),
  // EMAIL_SERVER_PASSWORD: z.string().min(1, 'EMAIL_SERVER_PASSWORD is required'),

  // PG_DB_USER: z.string().min(1, 'PG_DB_USER is required'),
  // PG_DB_PASSWORD: z.string().min(1, 'PG_DB_PASSWORD is required'),
  // PG_DB_NAME: z.string().min(1, 'PG_DB_NAME is required'),
  // PG_DB_HOST: z.string().min(1, 'PG_DB_HOST is required'),
  // PG_DB_PORT: z.preprocess((val) => Number(val), z.number().int().positive()),
  // PG_DB_SSL: z.preprocess((val) => val === 'true', z.boolean()),
  // PG_DB_MAX_CONNECTIONS: z.preprocess((val) => Number(val), z.number().int().positive()),
  // PG_DB_IDLE_TIMEOUT: z.preprocess((val) => Number(val), z.number().int().nonnegative()),
  NEXT_PUBLIC_MEASUREMENT_ID: z.string().optional(),

  // Optional for notifications
  NOTIFICATION_WEBHOOK: z.string().optional(),

  GOOGLE_CLIENT_ID: z.string().min(1, 'GOOGLE_CLIENT_ID is required'),
  GOOGLE_CLIENT_SECRET: z.string().min(1, 'GOOGLE_CLIENT_SECRET is required'),

  GITHUB_ID: z.string().min(1, 'GITHUB_ID is required'),
  GITHUB_SECRET: z.string().min(1, 'GITHUB_SECRET is required'),

  // Optional for analytics
  
});

// Log individual required env variables
console.log("🔍 Checking specific environment variables...");
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
console.log("GITHUB_ID:", process.env.GITHUB_ID);
console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);

// Parse and validate the environment variables
const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error('❌ Invalid environment variables detected!');
  console.error(env.error.flatten()); // Log formatted error details
  throw new Error('Invalid environment variables');
}

console.log("✅ Environment variables loaded successfully!");

export const {
  // AUTH_SECRET,
  // DEV,
  // EMAIL_PROVIDER_TOKEN,
  // EMAIL_SERVER_HOST,
  // EMAIL_SERVER_PORT,
  // EMAIL_SERVER_USER,
  // EMAIL_SERVER_PASSWORD,
  // PG_DB_USER,
  // PG_DB_PASSWORD,
  // PG_DB_NAME,
  // PG_DB_HOST,
  // PG_DB_PORT,
  // PG_DB_SSL,
  // PG_DB_MAX_CONNECTIONS,
  // PG_DB_IDLE_TIMEOUT,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GITHUB_ID,
  GITHUB_SECRET,
  NEXT_PUBLIC_MEASUREMENT_ID,
  NOTIFICATION_WEBHOOK,
} = env.data;
