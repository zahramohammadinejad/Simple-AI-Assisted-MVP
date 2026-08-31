// Public Supabase client configuration.
// The publishable key may be exposed in browser code. Database protection is enforced by RLS.
// Never place GEMINI_API_KEY or any server secret in this file.
const SUPABASE_URL = 'https://bvsyjqjgmnuerlmawzme.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_bpm_BmUwxJio8P5HDjq-YA_ur4nJCXP';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const authCard = document.getElementById('auth-card');
const appCard = document.getElementById('app-card');
const authMessage = document.getElementById('auth-message');
const requestMessage = document.getElementById('request-message');
const result = document.getElementById('result');

function showApp(user) {
  authCard.classList.add('hidden');
  appCard.classList.remove('hidden');
  document.getElementById('user-email').textContent = user.email || '';
}

function showAuth() {
  appCard.classList.add('hidden');
  authCard.classList.remove('hidden');
}

function formatAiResult(request) {
  const confidence = typeof request.ai_confidence === 'number'
    ? `${Math.round(request.ai_confidence * 100)}%`
    : 'Not available';

  result.replaceChildren();

  const title = document.createElement('strong');
  title.textContent = 'AI analysis';
  result.appendChild(title);

  const fields = [
    ['Type', request.request_type || 'Not available'],
    ['Item', request.extracted_item || 'Not identified'],
    ['Quantity', request.quantity ?? 'Not specified'],
    ['Priority', request.priority || 'Not available'],
    ['Department', request.assigned_department || 'Not assigned'],
    ['Confidence', confidence],
    ['Decision', request.decision || 'Human review'],
  ];

  const list = document.createElement('dl');
  fields.forEach(([label, value]) => {
    const dt = document.createElement('dt');
    dt.textContent = label;
    const dd = document.createElement('dd');
    dd.textContent = String(value);
    list.append(dt, dd);
  });
  result.appendChild(list);

  if (request.ai_analysis?.summary) {
    const summary = document.createElement('p');
    summary.textContent = `Summary: ${request.ai_analysis.summary}`;
    result.appendChild(summary);
  }

  const note = document.createElement('p');
  note.textContent = 'AI output is an initial routing recommendation and does not constitute final approval.';
  result.appendChild(note);
}

async function refreshSession() {
  const { data } = await supabaseClient.auth.getSession();
  if (data.session?.user) showApp(data.session.user);
  else showAuth();
}

document.getElementById('auth-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  authMessage.textContent = 'Logging in...';

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const { error } = await supabaseClient.auth.signInWithPassword({ email, password });

  if (error) {
    authMessage.textContent = 'Login failed. Check your email and password.';
    return;
  }

  authMessage.textContent = '';
  await refreshSession();
});

document.getElementById('logout-btn').addEventListener('click', async () => {
  await supabaseClient.auth.signOut();
  showAuth();
});

document.getElementById('request-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  requestMessage.textContent = 'Submitting...';
  result.classList.add('hidden');

  const { data: { session } } = await supabaseClient.auth.getSession();
  if (!session?.user) {
    requestMessage.textContent = 'Your session has expired. Please log in again.';
    showAuth();
    return;
  }

  const requesterName = document.getElementById('requester-name').value.trim();
  const description = document.getElementById('request-description').value.trim();

  if (!requesterName || requesterName.length > 100 || !description || description.length > 5000) {
    requestMessage.textContent = 'Please check the form fields and their length.';
    return;
  }

  const { data, error } = await supabaseClient.functions.invoke('create-request', {
    body: {
      requester_name: requesterName,
      request_description: description
    }
  });

  if (error || !data?.request) {
    requestMessage.textContent = 'Could not submit the request.';
    return;
  }

  requestMessage.textContent = data.ai_status === 'processed'
    ? 'Request analyzed successfully.'
    : 'Request saved securely. AI analysis is not available yet.';

  result.textContent = `Request ID: ${data.request.id} | Status: ${data.request.status}`;

  if (data.ai_status === 'processed') {
    formatAiResult(data.request);
  }

  result.classList.remove('hidden');
  event.target.reset();
});

refreshSession();
