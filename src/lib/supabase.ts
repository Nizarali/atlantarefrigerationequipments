import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface QuoteRequest {
  id?: string;
  name: string;
  business_name?: string;
  email: string;
  phone?: string;
  equipment_interest: string;
  message?: string;
  created_at?: string;
}

export interface NewsletterSubscriber {
  id?: string;
  email: string;
  subscribed_at?: string;
  is_active?: boolean;
}

export async function submitQuoteRequest(data: QuoteRequest) {
  const { data: result, error } = await supabase
    .from('quote_requests')
    .insert([data])
    .select()
    .maybeSingle();

  return { data: result, error };
}

export async function subscribeNewsletter(email: string) {
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .insert([{ email }])
    .select()
    .maybeSingle();

  return { data, error };
}
