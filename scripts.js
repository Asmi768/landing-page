document.addEventListener('DOMContentLoaded', function(){
  const menuToggle = document.getElementById('menu-toggle');
  const navList = document.getElementById('primary-nav');

  menuToggle.addEventListener('click', function(){
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    if(navList.hasAttribute('hidden')) navList.removeAttribute('hidden');
    else navList.setAttribute('hidden','');
  });

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        // move focus for accessibility
        target.setAttribute('tabindex','-1');
        target.focus({preventScroll:true});
        target.removeAttribute('tabindex');
      }
    });
  });

  // Form validation
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  function showStatus(msg, success){
    status.className = '';
    status.classList.remove('sr-only');
    status.textContent = msg;
    if(success) status.style.color='green';
    else status.style.color='red';
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    status.classList.add('sr-only');
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    // Simple client-side checks (additional server-side must exist after hosting)
    if(name.length < 2){
      showStatus('Please enter your name (at least 2 characters).', false);
      form.name.focus();
      return;
    }
    // RFC 5322-lite email regex (simple)
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRe.test(email)){
      showStatus('Please enter a valid email address.', false);
      form.email.focus();
      return;
    }
    if(message.length < 10){
      showStatus('Message is too short (min 10 characters).', false);
      form.message.focus();
      return;
    }

    // simulate sending
    showStatus('Sending message...', true);
    setTimeout(()=>{
      // On success
      showStatus('Thanks — your message was sent (demo).', true);
      form.reset();
    }, 900);
  });

  // client-side enhancement: show validation messages on blur
  form.querySelectorAll('input,textarea').forEach(el=>{
    el.addEventListener('blur', function(){
      if(this.validity && !this.checkValidity()){
        this.setAttribute('aria-invalid','true');
      } else {
        this.removeAttribute('aria-invalid');
      }
    });
  });
});
