# Database Setup Instructions

## Quick Setup (5 minutes)

Follow these steps to set up your Supabase database for RetireFree:

### 1. Access Supabase SQL Editor

1. Go to: https://supabase.com/dashboard/project/mmxafqzhvjoeklojsbhw/sql
2. Log in to your Supabase account
3. Click "New Query" or use an existing query tab

### 2. Run the SQL Setup Script

1. Open the file: `supabase-setup.sql` in this directory
2. Copy the entire contents of the file
3. Paste it into the Supabase SQL Editor
4. Click "Run" (or press Cmd/Ctrl + Enter)

### 3. Verify the Setup

After running the script, you should see success messages. Verify the tables were created:

1. Go to: https://supabase.com/dashboard/project/mmxafqzhvjoeklojsbhw/editor
2. You should see these new tables in the left sidebar:
   - `profiles`
   - `calculations`
   - `subscriptions`

### 4. Verify RLS Policies

1. Click on each table in the editor
2. Go to the "Policies" tab
3. You should see RLS policies listed for each table

## What Was Created

### Tables

1. **profiles** - User profile information
   - Links to auth.users
   - Auto-created when a user signs up
   - Stores basic user info

2. **calculations** - All retirement calculations
   - Stores calculator inputs and AI results
   - Can have null user_id for anonymous calculations
   - Includes AI advice, reasoning, and confidence

3. **subscriptions** - Stripe subscription data
   - Links to Stripe customer IDs
   - Tracks subscription status
   - Manages billing periods

### Security (RLS Policies)

- Users can only view/edit their own data
- Anonymous users can create calculations (but not view historical ones)
- All tables have proper Row Level Security enabled

### Triggers

- Auto-creates a profile when a user signs up
- Auto-updates `updated_at` timestamps

## Troubleshooting

### If you see errors about existing objects

This is normal if you've run the script before. The script uses `IF NOT EXISTS` so it's safe to run multiple times.

### If you need to reset the database

Run this SQL to drop all tables and start fresh:

```sql
DROP TABLE IF EXISTS subscriptions CASCADE;
DROP TABLE IF EXISTS calculations CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP FUNCTION IF EXISTS handle_new_user CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column CASCADE;
```

Then run the setup script again.

## Next Steps

After database setup is complete:

1. ✅ Test user signup at `/auth/signup`
2. ✅ Use the calculator (saves to database for logged-in users)
3. ✅ View calculation history in the dashboard

## Need Help?

If you encounter any issues:

1. Check that you're logged into the correct Supabase project
2. Verify you have admin permissions
3. Check the Supabase SQL editor output for specific error messages
4. Try running the SQL statements one section at a time
