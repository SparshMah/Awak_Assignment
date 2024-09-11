document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const usernameField = document.getElementById('username');
    const passwordField = document.getElementById('password');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    const responseMessage = document.getElementById('responseMessage');
    const spinner = document.getElementById('spinner');
    const togglePassword = document.getElementById('togglePassword');
    const rememberMeCheckbox = document.getElementById('rememberMe');

    
    togglePassword.addEventListener('click', () => {
        const type = passwordField.type === 'password' ? 'text' : 'password';
        passwordField.type = type;
        togglePassword.textContent = type === 'password' ? 'Show' : 'Hide';
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        
        usernameError.textContent = '';
        passwordError.textContent = '';
        responseMessage.textContent = '';
        spinner.style.display = 'block';

        // Validate form fields
        let isValid = true;

        const username = usernameField.value.trim();
        const password = passwordField.value.trim();

        if (!username || !/\S+@\S+\.\S+/.test(username)) {
            usernameError.textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        if (!password || password.length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters long.';
            isValid = false;
        }

        if (isValid) {
            // Make API request
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                if (response.ok) {
                    const result = await response.json();
                    responseMessage.textContent = 'Login successful!';
                    responseMessage.style.color = 'green';
                } else {
                    responseMessage.textContent = 'Login failed. Please try again.';
                    responseMessage.style.color = 'red';
                }
            } catch (error) {
                responseMessage.textContent = 'An error occurred. Please try again.';
                responseMessage.style.color = 'red';
            } finally {
                spinner.style.display = 'none'; 
            }
        } else {
            spinner.style.display = 'none'; 
        }
    });
});