export default function handler(req:any, res:any) {
  // Return only presence of env vars (no secret values)
  res.status(200).json({
    hasSupabaseUrl: !!process.env.SUPABASE_URL,
    hasServiceRole: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    hasAnonKey: !!process.env.SUPABASE_ANON_KEY,
    hasWhatsapp: !!process.env.VITE_WHATSAPP_NUMBER,
  });
}
