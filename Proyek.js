document.addEventListener('DOMContentLoaded', () => {
  const roleCustomerBtn = document.getElementById('role-customer');
  const roleTechBtn = document.getElementById('role-tech');
  const techFields = document.getElementById('techFields');
  const docsInput = document.getElementById('docs');
  const docsPreview = document.getElementById('docsPreview');
  const form = document.getElementById('registerForm');
  const googleBtn = document.getElementById('googleBtn');

  let selectedRole = 'customer';

  function setRole(role){
    selectedRole = role;
    if(role === 'technician'){
      techFields.style.display = 'block';
      techFields.setAttribute('aria-hidden','false');
      roleTechBtn.classList.add('active');
      roleCustomerBtn.classList.remove('active');
      roleTechBtn.setAttribute('aria-checked','true');
      roleCustomerBtn.setAttribute('aria-checked','false');
    } else {
      techFields.style.display = 'none';
      techFields.setAttribute('aria-hidden','true');
      roleCustomerBtn.classList.add('active');
      roleTechBtn.classList.remove('active');
      roleCustomerBtn.setAttribute('aria-checked','true');
      roleTechBtn.setAttribute('aria-checked','false');
    }
  }

  roleCustomerBtn.addEventListener('click', () => setRole('customer'));
  roleTechBtn.addEventListener('click', () => setRole('technician'));

  // show uploaded filename
  docsInput?.addEventListener('change', (e) => {
    const f = e.target.files && e.target.files[0];
    docsPreview.textContent = f ? `File: ${f.name}` : '';
  });

  // form submit
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if(!name || !email || !password){
      return alert('Nama, email, dan password wajib diisi.');
    }

    // prepare FormData (for files)
    const data = new FormData(form);
    data.set('role', selectedRole);

    // demo: tampilkan data di console dan reset
    console.log('Mengirim registrasi:', Object.fromEntries(data.entries()));
    alert('Form ter-submit (demo). Untuk produksi, kirim FormData ke backend via fetch.');

    form.reset();
    setRole('customer');
    docsPreview.textContent = '';
  });

  // google sign-in placeholder
  googleBtn.addEventListener('click', () => {
    alert('Placeholder Google Sign-In. Integrasikan OAuth Google untuk fungsi nyata.');
  });

  // inisialisasi tampilan
  setRole('customer');
});