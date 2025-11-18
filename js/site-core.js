/* js/site-core.js
   Unified form handling (only) - attaches to inline forms and modal form.
   Uses EmailJS credentials provided earlier.
*/

(function() {
  const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_14zrdg6',
    TEMPLATE_ID: 'template_snxhxlk',
    PUBLIC_KEY: '5SyxCT8kGY0_H51dC'
  };

  // Initialize EmailJS
  if (window.emailjs && typeof emailjs.init === 'function') {
    try { emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY); } catch(e){ console.warn('emailjs.init error', e); }
  }

  // Utility
  function $q(sel, ctx=document) { return ctx.querySelector(sel); }
  function $qa(sel, ctx=document) { return Array.from(ctx.querySelectorAll(sel)); }
  function escapeHtml(str=''){ return String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

  // Create unified modal (if requested)
  function createUnifiedModal(prefill = {}) {
    // Remove existing
    const existing = $q('.unified-form-modal');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay unified-form-modal';
    overlay.innerHTML = `
      <div class="modal-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <div>
            <h3 style="color:var(--brand);margin:0;font-size:1.25rem">Schedule a Visit</h3>
            <p style="margin:0;color:#6b7280;font-size:0.95rem">We'd love to show you around our campus!</p>
          </div>
          <button class="close-modal" aria-label="Close" style="border:none;background:transparent;font-size:20px;cursor:pointer">&times;</button>
        </div>

        <form id="contact-form-modal" class="contact-form" style="display:block">
            <div class="form-group"><label for="parentName_modal">Parent's Name</label><input type="text" id="parentName_modal" name="parentName" required value="${escapeHtml(prefill.parentName||'')}"></div>
            <div class="form-group"><label for="phone_modal">Phone Number</label><input type="tel" id="phone_modal" name="phone" required value="${escapeHtml(prefill.phone||'')}"></div>
            <div class="form-group"><label for="childAge_modal">Child's Age</label>
              <select id="childAge_modal" name="childAge" required>
                <option value="">Select age range</option>
                <option value="1.5 to 2 years">1.5 to 2 years</option>
                <option value="2 to 3 years">2 to 3 years</option>
                <option value="3 to 4 years">3 to 4 years</option>
                <option value="4 to 5 years">4 to 5 years</option>
              </select></div>
            <div class="form-group"><label for="program_modal">Program Interested In</label>
              <select id="program_modal" name="program" required>
                <option value="">Select a program</option>
                <option value="playgroup">Playgroup</option>
                <option value="nursery">Nursery</option>
                <option value="lkg">Pre-Primary 1</option>
                <option value="ukg">Pre-Primary 2</option>
                <option value="daycare">Day Care</option>
              </select></div>
            <div class="form-group"><label for="message_modal">Additional Message (Optional)</label>
              <textarea id="message_modal" name="message" rows="3">${escapeHtml(prefill.message||'')}</textarea></div>

            <button type="submit" class="crayon-button" style="display:inline-flex;align-items:center;gap:.5rem">
              <span id="submit-text-modal">Submit Inquiry</span>
              <div id="submit-spinner-modal" class="spinner hidden" aria-hidden="true"></div>
            </button>

            <p id="contact-form-success-message-modal" class="form-success hidden">Thank you! We'll call you soon!</p>
            <p id="contact-form-error-message-modal" class="form-error hidden">There was an error submitting your form. Please try again or call us directly.</p>
        </form>
      </div>
    `;
    document.body.appendChild(overlay);

    // Close handlers
    overlay.querySelector('.close-modal').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (ev) => { if (ev.target === overlay) overlay.remove(); });

    // Attach submission handler for modal form
    attachFormHandler($q('#contact-form-modal'));

    return overlay;
  }

  // openUnifiedModal(prefill) - other elements call this
  window.openUnifiedModal = function(prefill = {}) {
    return createUnifiedModal(prefill);
  };

  // Attach submit handler (works for inline forms titled #contact-form and modal #contact-form-modal)
  function attachFormHandler(form) {
    if (!form) return;
    if (form.dataset.bound === '1') return;
    form.dataset.bound = '1';

    const submitBtn = form.querySelector('[type="submit"]');
    const submitText = form.querySelector('#submit-text') || form.querySelector('#submit-text-modal');
    const submitSpinner = form.querySelector('#submit-spinner') || form.querySelector('#submit-spinner-modal');
    const successMsg = form.querySelector('#contact-form-success-message') || form.querySelector('#contact-form-success-message-modal');
    const errorMsg = form.querySelector('#contact-form-error-message') || form.querySelector('#contact-form-error-message-modal');

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (submitText) submitText.classList.add('hidden');
      if (submitSpinner) submitSpinner.classList.remove('hidden');
      if (successMsg) successMsg.classList.add('hidden');
      if (errorMsg) errorMsg.classList.add('hidden');

      // Collect fields (works for both inline and modal IDs)
      const parentName = form.querySelector('input[name="parentName"]') ? form.querySelector('input[name="parentName"]').value.trim() : '';
      const phone = form.querySelector('input[name="phone"]') ? form.querySelector('input[name="phone"]').value.trim() : '';
      const childAge = form.querySelector('select[name="childAge"]') ? form.querySelector('select[name="childAge"]').value : '';
      const program = form.querySelector('select[name="program"]') ? form.querySelector('select[name="program"]').value : '';
      const message = form.querySelector('textarea[name="message"]') ? form.querySelector('textarea[name="message"]').value.trim() : '';

      // Basic validation
      if (!parentName || !phone || !childAge || !program) {
        if (errorMsg) { errorMsg.textContent = 'Please fill all required fields.'; errorMsg.classList.remove('hidden'); }
        if (submitText) submitText.classList.remove('hidden');
        if (submitSpinner) submitSpinner.classList.add('hidden');
        return;
      }

      const payload = {
        parentName, phone, childAge, program, message: (message || 'N/A'), timestamp: new Date().toLocaleString(), source: 'Website Contact Form'
      };

      if (window.emailjs && typeof emailjs.send === 'function') {
        emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, payload)
          .then(() => {
            if (successMsg) successMsg.classList.remove('hidden');
            form.reset();
            if (submitText) submitText.classList.remove('hidden');
            if (submitSpinner) submitSpinner.classList.add('hidden');
            setTimeout(()=> {
              // auto-close modal if it's a modal form
              const overlay = form.closest('.unified-form-modal');
              if (overlay) overlay.remove();
              if (successMsg) successMsg.classList.add('hidden');
            }, 5000);
          })
          .catch((err)=> {
            console.error('EmailJS error', err);
            if (errorMsg) errorMsg.classList.remove('hidden');
            if (submitText) submitText.classList.remove('hidden');
            if (submitSpinner) submitSpinner.classList.add('hidden');
          });
      } else {
        console.warn('emailjs not available - fallback logging', payload);
        if (successMsg) successMsg.classList.remove('hidden');
        if (submitText) submitText.classList.remove('hidden');
        if (submitSpinner) submitSpinner.classList.add('hidden');
        setTimeout(()=> {
          const overlay = form.closest('.unified-form-modal');
          if (overlay) overlay.remove();
          if (successMsg) successMsg.classList.add('hidden');
        }, 3000);
      }
    });
  }

  // Attach to any inline forms present at load
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS if present
    if (window.emailjs && typeof emailjs.init === 'function') {
      try { emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY); } catch(e){}
    }

    // Attach to the main contact form if present
    attachFormHandler($q('#contact-form'));

    // Attach to any other forms with class contact-form
    $qa('form.contact-form').forEach(attachFormHandler);

    // Wire elements that should open the modal
    document.addEventListener('click', function(ev) {
      const el = ev.target.closest && ev.target.closest('.open-contact-modal');
      if (!el) return;
      const program = el.dataset.program || '';
      window.openUnifiedModal({ program });
    });

    // Also wire .open-unified-modal (if some elements expect it)
    $qa('.open-unified-modal').forEach(btn => btn.addEventListener('click', ()=> window.openUnifiedModal({})));
  });

})();
