const { createClient } = require('@supabase/supabase-js');

// Admin client with service role key for bypassing RLS
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Service role key bypasses RLS
);

module.exports = supabaseAdmin;