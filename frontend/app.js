// Public Supabase client configuration.
// The publishable key may be exposed in browser code. Database protection is enforced by RLS.
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

  requestMessage.textContent = 'Request saved securely.';
  result.textContent = `Request ID: ${data.request.id} | Status: ${data.request.status}`;
  result.classList.remove('hidden');
  event.target.reset();
});

refreshSession();
