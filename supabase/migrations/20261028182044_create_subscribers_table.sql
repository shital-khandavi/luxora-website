/*
# Create subscribers table for email signup

1. Purpose
   Stores email addresses of visitors who sign up for private collection
   releases and early access to new LUXORA TIME editions. This is a
   single-tenant, no-auth app — there is no sign-in screen, so the
   frontend talks to Supabase with the anon key and all policies must
   allow the `anon` role.

2. New Tables
   - `subscribers`
     - `id` (uuid, primary key, auto-generated)
     - `email` (text, unique, not null) — the visitor's email address
     - `source` (text, default 'popup') — where the signup came from
     - `created_at` (timestamptz, default now()) — signup timestamp

3. Security
   - Row Level Security enabled on `subscribers`.
   - GRANT INSERT to `anon, authenticated` so visitors can subscribe
     without signing in. Only INSERT is granted (no SELECT/UPDATE/DELETE
     to anon) so the public cannot read or enumerate other subscribers.
   - INSERT policy allows anyone (anon + authenticated) to insert, since
     signups are intentionally public. The unique constraint on `email`
     prevents duplicate subscriptions.
   - `service_role` granted full CRUD so edge functions / server-side
     code can manage the list later.
*/

CREATE TABLE IF NOT EXISTS subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  source text NOT NULL DEFAULT 'popup',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON subscribers TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON subscribers TO service_role;

DROP POLICY IF EXISTS "anon_insert_subscriber" ON subscribers;
CREATE POLICY "anon_insert_subscriber"
ON subscribers FOR INSERT
TO anon, authenticated
WITH CHECK (true);
