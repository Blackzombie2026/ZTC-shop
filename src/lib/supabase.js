import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY

// Mode cloud actif uniquement si les 2 clés sont configurées.
// Sinon tout fonctionne en local (localStorage) comme avant.
export const isCloudEnabled = Boolean(url && anon)

export const supabase = isCloudEnabled ? createClient(url, anon) : null
