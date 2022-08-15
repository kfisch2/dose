async function loginForm(event) {
    event.preventDefault();

    // username and password
    const username = document.querySelector('#login-username').value.trim();
    const password = document.querySelector('#login-pw').value.trim();
    // console.log(username, password);
    if (username && password) {
        // console.log(username, password);
        const response = await fetch('/api/patients/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password,
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        // console.log(response.body);
        console.log('here');

        if (response.ok) {
            // change to DASHBOARD when it's up and running
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

async function registerForm(event) {
    event.preventDefault();

    const username = document.querySelector('#register-username').value.trim();
    const email = document.querySelector('#register-email').value.trim();
    const number = document.querySelector('#register-number').value.trim();
    const pw = document.querySelector('#register-pw').value.trim();

    if (username && email && number && pw) {
        const response = await fetch('/api/patients', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                number,
                password,
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/home');
        } else if (username && email && pw) {
            const response = await fetch('/api/patient', {
                method: 'post',
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                alert(response.statusText);
            }
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginForm);
document
    .querySelector('.register-form')
    .addEventListener('submit', registerForm);
