-- NanoBanana AI Database Setup for Supabase
-- Run this script in Supabase SQL Editor

-- Drop existing tables if they exist (be careful in production!)
DROP TABLE IF EXISTS credit_transactions CASCADE;
DROP TABLE IF EXISTS generations CASCADE;
DROP TABLE IF EXISTS subscriptions CASCADE;
DROP TABLE IF EXISTS user_preferences CASCADE;
DROP TABLE IF EXISTS user_sessions CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users table
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
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
CREATE TABLE user_sessions (
  id BIGSERIAL PRIMARY KEY,
  user_uuid VARCHAR(255) NOT NULL,
  session_token VARCHAR(255) NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User preferences table
CREATE TABLE user_preferences (
  id BIGSERIAL PRIMARY KEY,
  user_uuid VARCHAR(255) NOT NULL,
  language VARCHAR(10) DEFAULT 'en',
  theme VARCHAR(20) DEFAULT 'light',
  notifications BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id BIGSERIAL PRIMARY KEY,
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
CREATE TABLE generations (
  id BIGSERIAL PRIMARY KEY,
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
CREATE TABLE credit_transactions (
  id BIGSERIAL PRIMARY KEY,
  user_uuid VARCHAR(255) NOT NULL,
  transaction_type VARCHAR(50) NOT NULL,
  amount INTEGER NOT NULL,
  description TEXT,
  subscription_id BIGINT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_uuid ON users(uuid);
CREATE INDEX idx_generations_user_uuid ON generations(user_uuid);
CREATE INDEX idx_subscriptions_user_uuid ON subscriptions(user_uuid);
CREATE INDEX idx_credit_transactions_user_uuid ON credit_transactions(user_uuid);

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

-- Enable Row Level Security (RLS) for Supabase
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (basic example - you may want to customize these)
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid()::text = uuid);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid()::text = uuid);
CREATE POLICY "Users can insert own data" ON users FOR INSERT WITH CHECK (auth.uid()::text = uuid);

-- Insert a test user (optional - for testing)
-- INSERT INTO users (uuid, email, nickname, subscription_plan, credits_balance) 
-- VALUES ('test-user-123', 'test@example.com', 'Test User', 'free', 10);

-- Grant necessary permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated; 