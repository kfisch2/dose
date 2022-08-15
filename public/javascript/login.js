async function loginForm(event) {
    event.preventDefault();

    // username and password
    const username = document.querySelector('#login-username').value.trim();
    const password = document.querySelector('#login-pw').value.trim();

    if (username && password) {
        const response = await fetch('/api/patients/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password,
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            console.log('successful login');
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}

async function registerForm(event) {
    event.preventDefault();
    const username = document.querySelector('#register-username').value;
    const email = document.querySelector('#register-email').value;
    const phone_number = document.querySelector('#register-number').value;
    const password = document.querySelector('#register-pw').value;

    console.log(username, email, phone_number, password);

    if (username && email && phone_number && password) {
        console.log(username, email, phone_number, password);
        const response = await fetch('/api/patients', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                phone_number,
                password,
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/home');
            console.log('successful register');
        } else if (username && email && password) {
            const response = await fetch('/api/patients', {
                method: 'post',
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                document.location.replace('/home');
                console.log('successful register');
            } else {
                alert(response.statusText);
                console.log('failed register');
            }
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginForm);
document
    .querySelector('.register-form')
    .addEventListener('submit', registerForm);
