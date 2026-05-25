import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabase: SupabaseClient

if (!supabaseUrl || !supabaseAnonKey) {
	console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Supabase client not initialized.')
	const handler = {
		get() {
			throw new Error('Supabase not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY at build time.')
		},
		apply() {
			throw new Error('Supabase not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY at build time.')
		}
	}
	supabase = new Proxy({}, handler) as SupabaseClient
} else {
	supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export { supabase }
