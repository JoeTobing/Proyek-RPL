// Simple client-side behavior for the registration form
document.addEventListener('DOMContentLoaded', () => {
  const roleButtons = document.querySelectorAll('.role');
  const techFields = document.getElementById('techFields');
  const docsInput = document.getElementById('docs');
  const docsPreview = document.getElementById('docsPreview');
  const form = document.getElementById('registerForm');
  const googleBtn = document.getElementById('googleBtn');

  let selectedRole = 'customer';

  roleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      roleButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedRole = btn.dataset.role;
      // show/hide tech fields
      if (selectedRole === 'technician') {
        techFields.style.display = 'block';
        btn.setAttribute('aria-checked','true');
        document.getElementById('role-customer').setAttribute('aria-checked','false');
      } else {
        techFields.style.display = 'none';
        btn.setAttribute('aria-checked','true');
        document.getElementById('role-tech').setAttribute('aria-checked','false');
      }
    });
  });

  // file preview (show filename)
  docsInput?.addEventListener('change', (e) => {
    const f = e.target.files && e.target.files[0];
    docsPreview.textContent = f ? `File: ${f.name}` : '';
  });

  // form submit (example: POST to /api/auth/register)
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const data = new FormData(form);

    // append role explicitly
    data.set('role', selectedRole);

    // client-side minimal validation
    const name = data.get('name')?.trim();
    const email = data.get('email')?.trim();
    const password = data.get('password')?.trim();
    if (!name || !email || !password) {
      return alert('Nama, email, dan password wajib diisi.');
    }

    // If backend expects JSON, convert FormData to JSON (files require multipart)
    // Example: sending multipart/form-data (with file) to backend endpoint
    try {
      const res = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        body: data
      });

      if (!res.ok) {
        const err = await res.json().catch(()=>({message:'Gagal'}));
        return alert('Registrasi gagal: ' + (err.message || res.statusText));
      }

      const result = await res.json();
      alert('Registrasi berhasil. Silakan login.');
      // redirect to login atau clear form
      form.reset();
      techFields.style.display = 'none';
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan jaringan.');
    }
  });

  // Google sign-in placeholder
  googleBtn.addEventListener('click', () => {
    // implementasi nyata: gunakan Google OAuth flow (popup) dan kirim id_token ke backend
    alert('Placeholder Google Sign-In. Integrasikan Google OAuth pada backend untuk produksi.');
  });
});