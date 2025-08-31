-- Initial database schema for NanoBanana AI
-- This file contains the SQL commands to create all necessary tables

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  uuid VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  nickname VARCHAR(255),
  avatar_url TEXT,
  subscription_plan VARCHAR(50) DEFAULT 'free',
  credits_balance INTEGER DEFAULT 10,
  language VARCHAR(10) DEFAULT 'en',
  timezone VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User sessions table
CREATE TABLE IF NOT EXISTS user_sessions (
  id SERIAL PRIMARY KEY,
  user_uuid VARCHAR(255) NOT NULL,
  session_token VARCHAR(255) NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id SERIAL PRIMARY KEY,
  user_uuid VARCHAR(255) NOT NULL,
  language VARCHAR(10) DEFAULT 'en',
  theme VARCHAR(20) DEFAULT 'light',
  notifications BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id SERIAL PRIMARY KEY,
  user_uuid VARCHAR(255) NOT NULL,
  plan_type VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL,
  creem_order_id VARCHAR(255),
  amount INTEGER NOT NULL,
  currency VARCHAR(10) DEFAULT 'USD',
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Generations table (AI image generation records)
CREATE TABLE IF NOT EXISTS generations (
  id SERIAL PRIMARY KEY,
  user_uuid VARCHAR(255) NOT NULL,
  prompt TEXT NOT NULL,
  image_url TEXT,
  size VARCHAR(20),
  model_used VARCHAR(50),
  credits_spent INTEGER DEFAULT 1,
  status VARCHAR(50) DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Credit transactions table
CREATE TABLE IF NOT EXISTS credit_transactions (
  id SERIAL PRIMARY KEY,
  user_uuid VARCHAR(255) NOT NULL,
  transaction_type VARCHAR(50) NOT NULL,
  amount INTEGER NOT NULL,
  description TEXT,
  subscription_id INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_uuid ON users(uuid);
CREATE INDEX IF NOT EXISTS idx_generations_user_uuid ON generations(user_uuid);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_uuid ON subscriptions(user_uuid);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_user_uuid ON credit_transactions(user_uuid);

-- Add foreign key constraints
ALTER TABLE user_sessions ADD CONSTRAINT fk_user_sessions_user_uuid 
  FOREIGN KEY (user_uuid) REFERENCES users(uuid) ON DELETE CASCADE;

ALTER TABLE user_preferences ADD CONSTRAINT fk_user_preferences_user_uuid 
  FOREIGN KEY (user_uuid) REFERENCES users(uuid) ON DELETE CASCADE;

ALTER TABLE subscriptions ADD CONSTRAINT fk_subscriptions_user_uuid 
  FOREIGN KEY (user_uuid) REFERENCES users(uuid) ON DELETE CASCADE;

ALTER TABLE generations ADD CONSTRAINT fk_generations_user_uuid 
  FOREIGN KEY (user_uuid) REFERENCES users(uuid) ON DELETE CASCADE;

ALTER TABLE credit_transactions ADD CONSTRAINT fk_credit_transactions_user_uuid 
  FOREIGN KEY (user_uuid) REFERENCES users(uuid) ON DELETE CASCADE; 