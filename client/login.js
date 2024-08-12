document.addEventListener('DOMContentLoaded', function(){
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', async function(event){
    event.preventDefault();

    const formData = {
      name: document.getElementById('nameid').value,
      password: document.getElementById('passwordid').value,
      number: document.getElementById('number').value
    };

    console.log('Login Form Data', formData);

    try{
      const response = await fetch('http://localhost:3000/login',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if(!response.ok){
        throw new error('Failed to Login');
      }

      const data = await response.text();
      console.log('Login Response Data: ',data);

      if (data=='Login Successful'){
        alert ('Login Successful');
        window.location.pathname = 'cuisine_page.html';
      }
      else{
        alert('Login was successful');
        window.location.pathname = 'cuisine_page.html';
      }
    }
    catch(error){
      console.error('Error Submitting Login Form', error);
      alert('Login was not successful');
    }
  })
})