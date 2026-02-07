// Contact form handler
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');

  if (form) {
    // Add event listener to prevent default form submission
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('.btn-submit');
      const originalBtnText = submitBtn.textContent;

      // Loading state
      submitBtn.textContent = 'Enviando...';
      submitBtn.disabled = true;

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          // Show success message
          showSuccessMessage();
          form.reset();
        } else {
          // Show error message
          const data = await response.json();
          if (Object.hasOwn(data, 'errors')) {
            alert(data["errors"].map(error => error["message"]).join(", "));
          } else {
            alert('Hubo un problema al enviar el formulario.');
          }
        }
      } catch (error) {
        alert('Hubo un error de conexión.');
      } finally {
        // Reset button state if not success (success handles its own button state in showSuccessMessage)
        // Check if success message is NOT showing to avoid overwriting the checkmark
        if (submitBtn.textContent === 'Enviando...') {
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
        }
      }
    });
  }
});

function showSuccessMessage() {
  const submitBtn = document.querySelector('.btn-submit');
  const originalText = submitBtn.textContent;

  submitBtn.textContent = '✓ Mensaje enviado';
  submitBtn.style.background = 'linear-gradient(90deg, #00d9ff, #0096ff)';
  submitBtn.style.color = '#000';

  setTimeout(() => {
    submitBtn.textContent = originalText;
    submitBtn.style.background = '';
    submitBtn.style.color = '';
  }, 3000);
}