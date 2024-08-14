document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, username, phone, password }),
        });

        if (response.ok) {
            const result = await response.json();
            localStorage.setItem('username', username);
            localStorage.setItem('name', name);
            alert('User created successfully');
            window.location.href = '/login';
        } else {
            const result = await response.json();
            alert(result.message || 'Error creating user');
        }
    } catch (error) {
        alert('Error creating user');
        console.error('Error:', error);
    }
});
