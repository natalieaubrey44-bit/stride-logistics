How to apply the chat schema and RLS policies

1. Review the migration SQL:
   - File: supabase/migrations/001_create_chat_tables.sql
   - File: supabase/migrations/002_create_shipments_and_finish_chat.sql
   - Edit policies to reflect your auth model before applying.

2. Apply via Supabase SQL editor:
   - Open the Supabase project dashboard -> SQL Editor -> Run the SQL file contents.

3. Apply via Supabase CLI (recommended for automation):
   - Install the CLI: <https://supabase.com/docs/guides/cli>
   - Authenticate: `supabase login`
   - Push migrations: `supabase db push --project-ref <your-project-ref>`

4. Automate on push (GitHub Actions):
   - Add a workflow that runs `supabase db push` on merge to main using a service key.
   - Store the service_role key securely in GitHub Secrets.

5. Verify:
   - Check the `shipments`, `chat_rooms`, and `chat_messages` tables appear in the Supabase table viewer.
   - Create an auth user for the admin login in Supabase Authentication.
   - Log in at `/sl-portal`, create a shipment, copy the generated tracking number, and test it on `/track`.
   - Test inserting a chat room and messages from the site, then respond from `/sl-portal/dashboard`.

Admin dashboard workflow:

- Visit `/sl-portal`.
- Log in with a Supabase Authentication user from the same project configured in `.env`.
- Create a shipment with customer name, origin, destination, initial status, and optional note.
- Copy the generated `STR-XXXXX` tracking number for the customer.
- Use the Edit button in the shipment list to update package status and status note.
- Customers can enter the tracking number on `/track` to see the latest status.

Supabase project details:

- If you only changed your Supabase account email, your project URL and anon key usually stay the same.
- If you created or moved to a different Supabase project, update:
  - Local `.env`: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
  - Hosting provider environment variables with the same two values.
  - GitHub Actions secrets, if using migrations: `SUPABASE_PROJECT_REF` and `SUPABASE_SERVICE_ROLE_KEY`.
- Never put the service-role key in `.env` or frontend code.

Live chat workflow:

- Visitors use the floating chat widget. The first message creates a `chat_rooms` row and inserts a `chat_messages` row.
- The browser stores the visitor and room IDs in local storage so the same visitor can keep the conversation open.
- Admins respond from the Live Chat Queue on `/sl-portal/dashboard`.
- Realtime updates require `chat_rooms` and `chat_messages` to be in the `supabase_realtime` publication, which the second migration attempts to configure.

Security notes:

- The example RLS policies in the migration are permissive for demonstration. Tighten them:
  - Limit public inserts/selects to rows that include a matching visitor token or verified identifier.
  - Use Supabase functions to create rooms server-side when possible.
- Do not expose `service_role` key in client-side code or public repos.
