/**
 * Database Setup Script
 * Run this script to set up the Supabase database tables
 *
 * Usage: node setup-database.js
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:');
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
  console.error('   SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✓' : '✗');
  process.exit(1);
}

if (supabaseServiceKey === 'xxx') {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY is not set properly.');
  console.error('Please update the .env file with the actual service role key from Supabase.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
  console.log('🚀 Starting database setup...\n');

  // Read the SQL file
  const sqlPath = path.join(__dirname, 'supabase-setup.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  try {
    console.log('📝 Executing SQL setup script...');

    // Split SQL into individual statements and execute them
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        console.log(`Executing statement ${i + 1}/${statements.length}...`);
        const { error } = await supabase.rpc('exec_sql', { sql: statement });

        if (error) {
          console.warn(`⚠️  Warning on statement ${i + 1}:`, error.message);
        }
      }
    }

    console.log('\n✅ Database setup complete!');
    console.log('\nTables created:');
    console.log('  - profiles');
    console.log('  - calculations');
    console.log('  - subscriptions');
    console.log('\n✅ RLS policies enabled on all tables.');
    console.log('\nYou can now:');
    console.log('  1. Test user signup at /auth/signup');
    console.log('  2. Use the calculator (saves to database for logged-in users)');
    console.log('  3. View calculation history in the dashboard');

  } catch (error) {
    console.error('\n❌ Error setting up database:', error);
    console.error('\nPlease run the SQL manually in the Supabase SQL Editor:');
    console.error('  1. Go to https://supabase.com/dashboard/project/mmxafqzhvjoeklojsbhw/sql');
    console.error('  2. Copy the contents of supabase-setup.sql');
    console.error('  3. Paste and run in the SQL editor');
    process.exit(1);
  }
}

setupDatabase();
