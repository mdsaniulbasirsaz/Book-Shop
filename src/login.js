document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form').addEventListener('submit', async function(event) {
      event.preventDefault();

      const username = document.getElementById('username').value;
      const password = document.getElementById('exampleInputPassword1').value;

      try {
        const response = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        const result = await response.json();

        if (response.ok) {
          alert('Login successful');
          localStorage.setItem('username', username);
          localStorage.setItem('name', name);
          window.location.href = '/index.html';
        } else {
          alert(result.message || 'Error logging in');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error logging in');
      }
    });
  });