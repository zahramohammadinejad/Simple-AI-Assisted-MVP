const SUPABASE_URL = 'PASTE_YOUR_SUPABASE_URL_HERE';
const SUPABASE_ANON_KEY = 'PASTE_YOUR_SUPABASE_ANON_KEY_HERE';

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
    authMessage.textContent = error.message;
    return;
  }

  authMessage.textContent = '';
  await refreshSession();
});

document.getElementById('signup-btn').addEventListener('click', async () => {
  authMessage.textContent = 'Creating account...';

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!email || password.length < 6) {
    authMessage.textContent = 'Enter a valid email and a password of at least 6 characters.';
    return;
  }

  const { error } = await supabaseClient.auth.signUp({ email, password });

  if (error) {
    authMessage.textContent = error.message;
    return;
  }

  authMessage.textContent = 'Account created. Check your email if confirmation is enabled.';
});

document.getElementById('logout-btn').addEventListener('click', async () => {
  await supabaseClient.auth.signOut();
  showAuth();
});

document.getElementById('request-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  requestMessage.textContent = 'Submitting...';
  result.classList.add('hidden');

  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) {
    requestMessage.textContent = 'Please log in again.';
    showAuth();
    return;
  }

  const requesterName = document.getElementById('requester-name').value.trim();
  const description = document.getElementById('request-description').value.trim();

  const { data, error } = await supabaseClient
    .from('requests')
    .insert({
      user_id: user.id,
      requester_name: requesterName,
      requester_email: user.email,
      request_description: description
    })
    .select()
    .single();

  if (error) {
    requestMessage.textContent = error.message;
    return;
  }

  requestMessage.textContent = 'Request saved.';
  result.innerHTML = `<strong>Request ID:</strong> ${data.id}<br><strong>Status:</strong> ${data.status}`;
  result.classList.remove('hidden');
  event.target.reset();
});

refreshSession();
