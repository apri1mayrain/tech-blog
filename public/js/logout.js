// Send POST request to logout user
const logout = async () => {
  const response = await fetch('/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    alert('You have been logged out.');
    // Once user is logged out, the current page will be reloaded
    document.location.reload();
  } else if(response.status === 400) {
    const resMessage = await response.json();
    alert(resMessage.message);
  }
};

document.querySelector('#logout').addEventListener('click', logout);