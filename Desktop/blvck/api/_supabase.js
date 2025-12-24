const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE) {
  // Warning only; callers will throw when attempting to use network
  // but we keep module present so serverless imports succeed.
  // console.warn('Supabase URL or service role key not set. API endpoints will fail until configured.');
}

async function supabaseFetch(path, opts = {}) {
  if (!SUPABASE_URL || !SERVICE_ROLE) throw new Error('Supabase env vars not configured');
  const url = `${SUPABASE_URL.replace(/\/+$/, '')}/rest/v1/${path}`;
  const headers = Object.assign({
    apikey: String(SERVICE_ROLE),
    Authorization: `Bearer ${SERVICE_ROLE}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  }, opts.headers || {});
  const res = await fetch(url, Object.assign({}, opts, { headers }));
  return res;
}

exports.insertMessage = async function insertMessage(payload) {
  const res = await supabaseFetch('messages', { method: 'POST', body: JSON.stringify(payload) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

exports.getMessages = async function getMessages(limit = 100) {
  const res = await supabaseFetch(`messages?order=created_at.desc&limit=${limit}`, { method: 'GET' });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

exports.patchMessage = async function patchMessage(id, payload) {
  const res = await supabaseFetch(`messages?id=eq.${id}`, { method: 'PATCH', body: JSON.stringify(payload) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

exports.deleteMessage = async function deleteMessage(id) {
  const res = await supabaseFetch(`messages?id=eq.${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

exports.getServices = async function getServices() {
  const res = await supabaseFetch('services?order=created_at.desc', { method: 'GET' });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

exports.patchService = async function patchService(id, payload) {
  const res = await supabaseFetch(`services?id=eq.${id}`, { method: 'PATCH', body: JSON.stringify(payload) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

exports.getOrders = async function getOrders(limit = 100) {
  const res = await supabaseFetch(`orders?order=created_at.desc&limit=${limit}`, { method: 'GET' });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

exports.insertOrder = async function insertOrder(payload) {
  const res = await supabaseFetch('orders', { method: 'POST', body: JSON.stringify(payload) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

exports.patchOrder = async function patchOrder(id, payload) {
  const res = await supabaseFetch(`orders?id=eq.${id}`, { method: 'PATCH', body: JSON.stringify(payload) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

exports.deleteOrder = async function deleteOrder(id) {
  const res = await supabaseFetch(`orders?id=eq.${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};
