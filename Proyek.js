document.addEventListener('DOMContentLoaded', () => {
  const roleCustomerBtn = document.getElementById('role-customer');
  const roleTechBtn = document.getElementById('role-tech');
  const techFields = document.getElementById('techFields');
  const docsInput = document.getElementById('docs');
  const docsPreview = document.getElementById('docsPreview');
  const form = document.getElementById('registerForm');
  const googleBtn = document.getElementById('googleBtn');
  const submitBtn = form.querySelector('button[type="submit"]');

  let selectedRole = 'customer';

  function setRole(role) {
    selectedRole = role;
    if (role === 'technician') {
      techFields.style.display = 'block';
      techFields.setAttribute('aria-hidden', 'false');
      roleTechBtn.classList.add('active');
      roleCustomerBtn.classList.remove('active');
      roleTechBtn.setAttribute('aria-checked', 'true');
      roleCustomerBtn.setAttribute('aria-checked', 'false');
    } else {
      techFields.style.display = 'none';
      techFields.setAttribute('aria-hidden', 'true');
      roleCustomerBtn.classList.add('active');
      roleTechBtn.classList.remove('active');
      roleCustomerBtn.setAttribute('aria-checked', 'true');
      roleTechBtn.setAttribute('aria-checked', 'false');
    }
  }

  roleCustomerBtn.addEventListener('click', () => setRole('customer'));
  roleTechBtn.addEventListener('click', () => setRole('technician'));

  docsInput?.addEventListener('change', (e) => {
    const f = e.target.files && e.target.files[0];
    docsPreview.textContent = f ? `File: ${f.name}` : '';
  });

  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!name || !email || !password) {
      return alert('Nama, email, dan password wajib diisi.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return alert('Format email tidak valid.');
    }

    if (password.length < 6) {
      return alert('Password minimal 6 karakter.');
    }

    const file = docsInput?.files?.[0];
    if (selectedRole === 'technician' && file) {
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        return alert('Dokumen harus berupa PDF, JPG, atau PNG.');
      }
      if (file.size > 2 * 1024 * 1024) {
        return alert('Ukuran dokumen maksimal 2MB.');
      }
    }

    const formData = new FormData(form);
    formData.set('role', selectedRole);

    submitBtn.disabled = true;
    submitBtn.textContent = 'Mendaftar...';

    try {
      const res = await fetch('http://127.0.0.1:4000/api/auth/register', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: 'Gagal' }));
        return alert('Registrasi gagal: ' + (err.message || res.statusText));
      }

      const result = await res.json();
      alert('Registrasi berhasil! ID pengguna: ' + result.user_id);

      form.reset();
      setRole('customer');
      docsPreview.textContent = '';

      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1500);
    } catch (err) {
      console.error('❌ Error:', err);
      alert('Terjadi kesalahan jaringan atau server.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Daftar';
    }
  });

  googleBtn.addEventListener('click', () => {
    alert('Fitur Google Sign-In belum aktif. Integrasikan OAuth Google di backend untuk produksi.');
  });

  setRole('customer');
});

// Google