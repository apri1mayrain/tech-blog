// Send POST response info to login user
const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // Send POST response to login user
  if (username && password) {
    const response = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If user is successfully authenticated, they will be redirect to the dashbaord
      alert('Login successful.');
      document.location.replace('/dashboard');
    } else if(response.status === 400) {
      const resMessage = await response.json();
      alert(resMessage.message);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
