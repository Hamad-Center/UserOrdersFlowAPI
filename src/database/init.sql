-- Database Initialization Script for User Class Management System
-- Phase 1: Docker Infrastructure & Database Setup

-- Ensure database exists
SELECT 'CREATE DATABASE user_class_management'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'user_class_management');

-- Connect to the database
\c user_class_management;

-- Enable UUID extension for future use
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Note: Tables will be created by Prisma migrations
-- This script provides database-level setup and extensions

-- Grant permissions to the application user
GRANT ALL PRIVILEGES ON DATABASE user_class_management TO sa; 