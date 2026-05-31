How to apply the chat schema and RLS policies

1. Review the migration SQL:
   - File: supabase/migrations/001_create_chat_tables.sql
   - Edit policies to reflect your auth model before applying.

2. Apply via Supabase SQL editor:
   - Open the Supabase project dashboard -> SQL Editor -> Run the SQL file contents.

3. Apply via Supabase CLI (recommended for automation):
   - Install the CLI: https://supabase.com/docs/guides/cli
   - Authenticate: `supabase login`
   - Push migrations: `supabase db push --project-ref <your-project-ref>`

4. Automate on push (GitHub Actions):
   - Add a workflow that runs `supabase db push` on merge to main using a service key.
   - Store the service_role key securely in GitHub Secrets.

5. Verify:
   - Check the tables appear in the Supabase table viewer.
   - Test inserting a room and messages from the site and from the SQL editor.

Security notes:

- The example RLS policies in the migration are permissive for demonstration. Tighten them:
  - Limit public inserts/selects to rows that include a matching visitor token or verified identifier.
  - Use Supabase functions to create rooms server-side when possible.
- Do not expose `service_role` key in client-side code or public repos.
