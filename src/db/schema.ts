import {
  pgTable,
  serial,
  varchar,
  text,
  boolean,
  integer,
  timestamp,
  unique,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

// Users table
export const users = pgTable(
  'users',
  {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    uuid: varchar('uuid', { length: 255 }).notNull().unique(),
    email: varchar('email', { length: 255 }).notNull(),
    password_hash: text('password_hash'),
    nickname: varchar('nickname', { length: 255 }),
    avatar_url: text('avatar_url'),
    subscription_plan: varchar('subscription_plan', { length: 50 }).default('free'),
    credits_balance: integer('credits_balance').default(10),
    language: varchar('language', { length: 10 }).default('en'),
    timezone: varchar('timezone', { length: 50 }),
    email_verified: boolean('email_verified').default(false),
    email_verified_at: timestamp('email_verified_at', { withTimezone: true }),
    created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  },
  (table) => [
    uniqueIndex('email_unique_idx').on(table.email),
  ]
);

// Email verification tokens table
export const email_verifications = pgTable('email_verifications', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  user_uuid: varchar('user_uuid', { length: 255 }).notNull(),
  token: varchar('token', { length: 255 }).notNull().unique(),
  expires_at: timestamp('expires_at', { withTimezone: true }).notNull(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// User sessions table
export const user_sessions = pgTable('user_sessions', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  user_uuid: varchar('user_uuid', { length: 255 }).notNull(),
  session_token: varchar('session_token', { length: 255 }).notNull().unique(),
  expires_at: timestamp('expires_at', { withTimezone: true }).notNull(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// User preferences table
export const user_preferences = pgTable('user_preferences', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  user_uuid: varchar('user_uuid', { length: 255 }).notNull(),
  language: varchar('language', { length: 10 }).default('en'),
  theme: varchar('theme', { length: 20 }).default('light'),
  notifications: boolean('notifications').default(true),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// Subscriptions table
export const subscriptions = pgTable('subscriptions', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  user_uuid: varchar('user_uuid', { length: 255 }).notNull(),
  plan_type: varchar('plan_type', { length: 50 }).notNull(),
  status: varchar('status', { length: 50 }).notNull(),
  creem_order_id: varchar('creem_order_id', { length: 255 }),
  amount: integer('amount').notNull(),
  currency: varchar('currency', { length: 10 }).default('USD'),
  start_date: timestamp('start_date', { withTimezone: true }),
  end_date: timestamp('end_date', { withTimezone: true }),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Generations table (AI image generation records)
export const generations = pgTable('generations', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  user_uuid: varchar('user_uuid', { length: 255 }).notNull(),
  prompt: text('prompt').notNull(),
  image_url: text('image_url'),
  size: varchar('size', { length: 20 }),
  model_used: varchar('model_used', { length: 50 }),
  credits_spent: integer('credits_spent').default(1),
  status: varchar('status', { length: 50 }).default('completed'),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Credit transactions table
export const credit_transactions = pgTable('credit_transactions', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  user_uuid: varchar('user_uuid', { length: 255 }).notNull(),
  transaction_type: varchar('transaction_type', { length: 50 }).notNull(),
  amount: integer('amount').notNull(),
  description: text('description'),
  subscription_id: integer('subscription_id'),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Export types for TypeScript
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type UserSession = typeof user_sessions.$inferSelect;
export type NewUserSession = typeof user_sessions.$inferInsert;
export type UserPreference = typeof user_preferences.$inferSelect;
export type NewUserPreference = typeof user_preferences.$inferInsert;
export type Subscription = typeof subscriptions.$inferSelect;
export type NewSubscription = typeof subscriptions.$inferInsert;
export type Generation = typeof generations.$inferSelect;
export type NewGeneration = typeof generations.$inferInsert;
export type CreditTransaction = typeof credit_transactions.$inferSelect;
export type NewCreditTransaction = typeof credit_transactions.$inferInsert;
export type EmailVerification = typeof email_verifications.$inferSelect;
export type NewEmailVerification = typeof email_verifications.$inferInsert; 