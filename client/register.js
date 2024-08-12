document.addEventListener('DOMContentLoaded', function() {
  const registrationForm = document.getElementById('user');

  registrationForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = {
      name: document.getElementById('nameid').value,
      email: document.getElementById('email').value,
      number: document.getElementById('number').value,
      city: document.getElementById('city').value,
      password: document.getElementById('passwordid').value
    };

    console.log('Registration Form Data:', formData);

    try {
      const response = await fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit registration form');
      }

      const data = await response.json();
      console.log('Registration Response Data:', data);
      alert('Registration Successful.');
      window.location.href = 'cuisine_page.html';
    } catch (error) {
      console.error('Error submitting registration form:', error);
      alert('Registration was not successful.');
    }
  });
});
