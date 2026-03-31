import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://luuozbrkvdyxndjqdtzy.supabase.co'
const supabaseKey = 'sb_publishable_uYsBAKGwhQXwU4Ote8KcFQ_d2EE3Kl4'

export const supabase = createClient(supabaseUrl, supabaseKey)
