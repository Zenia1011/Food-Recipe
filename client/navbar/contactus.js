document.addEventListener('DOMContentLoaded', function(){
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', async function(event){
    event.preventDefault();

    const formData = {
      question: document.getElementById('question').value,
      email: document.getElementById('email').value
    };

    console.log('Contact Form Data:', formData);

    try{
      const response = await fetch('http://localhost:3000/contact',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if(!response.ok){
        throw new error('Failed to Submit Question');
      }

      const data = await response.text();
      console.log('Question Data', data);

      alert('Your Question was Submitted Successfully!!');
    }
    catch(error){
      console.error('Error submitting details:', error);
      alert('There was an error in submitting your Question')
    }
  })
})