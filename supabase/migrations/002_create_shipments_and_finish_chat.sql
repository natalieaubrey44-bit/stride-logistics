-- Migration: Create shipments table and complete live chat read/realtime setup

BEGIN;

CREATE TABLE IF NOT EXISTS public.shipments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_number text NOT NULL UNIQUE,
  customer_name text NOT NULL,
  origin text NOT NULL,
  destination text NOT NULL,
  status text NOT NULL DEFAULT 'Booked',
  status_note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT shipments_tracking_number_format
    CHECK (tracking_number ~ '^STR-[A-Z0-9]{5}$'),
  CONSTRAINT shipments_status_check
    CHECK (
      status IN (
        'Booked',
        'In Transit',
        'At Customs',
        'In Wharf',
        'Arrived',
        'Delivered'
      )
    )
);

CREATE INDEX IF NOT EXISTS idx_shipments_tracking_number
  ON public.shipments (tracking_number);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_shipments_updated_at ON public.shipments;
CREATE TRIGGER set_shipments_updated_at
  BEFORE UPDATE ON public.shipments
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.shipments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_admin_full_access_shipments" ON public.shipments;
CREATE POLICY "authenticated_admin_full_access_shipments" ON public.shipments
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "public_tracking_lookup" ON public.shipments;
CREATE POLICY "public_tracking_lookup" ON public.shipments
  FOR SELECT
  TO anon
  USING (true);

DROP POLICY IF EXISTS "public_select_room_messages" ON public.chat_messages;
CREATE POLICY "public_select_room_messages" ON public.chat_messages
  FOR SELECT
  TO anon
  USING (true);

DROP POLICY IF EXISTS "public_select_rooms" ON public.chat_rooms;
CREATE POLICY "public_select_rooms" ON public.chat_rooms
  FOR SELECT
  TO anon
  USING (true);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'chat_rooms'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_rooms;
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'chat_messages'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
  END IF;
END $$;

COMMIT;
