-- Migration: Add email verification functionality
-- Date: 2024-01-01

-- Add password_hash and email verification fields to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS password_hash TEXT,
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS email_verified_at TIMESTAMP WITH TIME ZONE;

-- Create email_verifications table
CREATE TABLE IF NOT EXISTS email_verifications (
  id SERIAL PRIMARY KEY,
  user_uuid VARCHAR(255) NOT NULL,
  token VARCHAR(255) NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_uuid for better performance
CREATE INDEX IF NOT EXISTS idx_email_verifications_user_uuid ON email_verifications(user_uuid);

-- Create index on token for faster lookups
CREATE INDEX IF NOT EXISTS idx_email_verifications_token ON email_verifications(token);

-- Create index on expires_at for cleanup operations
CREATE INDEX IF NOT EXISTS idx_email_verifications_expires_at ON email_verifications(expires_at); 