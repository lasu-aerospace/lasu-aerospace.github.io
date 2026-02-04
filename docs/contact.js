// Contact form handler
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');
  
  if (form) {
    // Add event listener to prevent default form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        asunto: document.getElementById('asunto').value,
        mensaje: document.getElementById('mensaje').value
      };
      
      // Show success message (you can replace this with actual form submission)
      showSuccessMessage();
      
      // Reset form
      form.reset();
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