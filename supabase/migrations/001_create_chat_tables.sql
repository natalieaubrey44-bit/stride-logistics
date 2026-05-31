-- Migration: Create chat rooms and messages tables for live chat feature
-- Run in Supabase SQL editor or via the Supabase CLI (supabase db push)

BEGIN;

-- chat_rooms: one row per visitor session/conversation
CREATE TABLE IF NOT EXISTS public.chat_rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id text,
  visitor_name text,
  visitor_email text,
  status text NOT NULL DEFAULT 'open',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- chat_messages: messages for rooms
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES public.chat_rooms(id) ON DELETE CASCADE,
  sender_type text NOT NULL CHECK (sender_type IN ('visitor','admin','system')),
  sender_name text,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_chat_messages_room_id_created_at ON public.chat_messages(room_id, created_at DESC);

-- Recommended RLS (Row Level Security)
-- Enable RLS on tables and then create policies appropriate for your auth model.
-- Below are example policies; review and adapt them before applying in production.

-- Enable RLS
ALTER TABLE public.chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Policy: allow authenticated admin role (supabase role) to select/insert/update/delete
-- Replace `auth.role()` checks or use custom claims as needed.

-- Allow authenticated users (admins) full access if they are in a role
CREATE POLICY "allow_admin_full_access" ON public.chat_rooms
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "allow_admin_full_access_messages" ON public.chat_messages
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Policy: allow visitors (public) to create rooms and insert messages but only for their visitor_id
-- This example assumes the visitor provides a client-side generated visitor_id stored in the row.

CREATE POLICY "public_insert_room" ON public.chat_rooms
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "public_insert_message" ON public.chat_messages
  FOR INSERT
  TO public
  WITH CHECK (true);

COMMIT;

-- NOTES:
-- 1) The policies above are permissive for demonstration. For production, tighten them:
--    - Require visitors to prove ownership (e.g., signed JWT, session cookie, or server function that issues visitor tokens).
--    - Only allow SELECT for visitors on messages that belong to their room (e.g., using visitor_id checks).
-- 2) If using Supabase functions or service_role, use them for admin operations that require elevated privileges.
-- 3) To automate migration on push, add this file to your repo and configure a CI step to run `supabase db push` or use Supabase's GitHub integration.
