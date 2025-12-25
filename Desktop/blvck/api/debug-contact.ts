import { insertMessage } from './_supabase';

export default async function handler(req:any,res:any){
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');
  try{
    const payload = { name: 'debug-run', email: 'debug@example.com', phone: null, subject: 'debug', message: 'debug run' };
    const inserted = await insertMessage(payload);
    return res.status(200).json({ ok: true, inserted: Array.isArray(inserted) ? inserted[0] : inserted });
  }catch(err:any){
    console.error('debug-contact error', err);
    return res.status(500).json({ error: String(err?.message || err), stack: (err?.stack || '').split('\n').slice(0,10) });
  }
}
