// Trigger alert functions

// Pre-existing username/email/phone number
const alreadyExists = (field) => {
    const alertPlaceholder = document.querySelector('.login-alert');
    const alert = (message, type) => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-dismiss="alert" aria-label="Close"></button>',
        ].join('');
        alertPlaceholder.append(wrapper);
    };
        alert(`${field} already used with an existing account`, 'danger')
};

// Incorrect username or password
const wrongUser_PW = () => {
    const alertPlaceholder = document.querySelector('.login-alert');
    const alert = (message, type) => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-dismiss="alert" aria-label="Close"></button>',
        ].join('');
        alertPlaceholder.append(wrapper);
    };
        alert(`Wrong username or password`, 'danger')
};
  
// Missing login field function
const missingFieldLogin = (field) => {
    const alertPlaceholder = document.querySelector('.login-alert');
    const alert = (message, type) => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-dismiss="alert" aria-label="Close"></button>',
        ].join('');
        alertPlaceholder.append(wrapper);
    };
        alert(`${field} required`, 'danger')
};

// Missing register field function
const missingFieldRegister = (field) => {
    const alertPlaceholder = document.querySelector('.register-alert');
    const alert = (message, type) => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-dismiss="alert" aria-label="Close"></button>',
        ].join('');
        alertPlaceholder.append(wrapper);
    };
        alert(`${field} required`, 'danger')
}

// LOGIN FORM
async function loginForm(event) {
    event.preventDefault();

    // username and password
    const username = document.querySelector('#login-username').value.trim();
    const password = document.querySelector('#login-pw').value.trim();

    // Missing fields
    if (!username || !password) {
        missingFieldLogin('username');
    };
    if (!password){
        missingFieldLogin('password')
    }

    // Filled fields
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
            document.location.replace('/dashboard');
        } else {
            wrongUser_PW();
        }
    }
}


// REGISTER FORM 
async function registerForm(event) {
    event.preventDefault();
    console.log('clicked')
    const username = document.querySelector('#register-username').value;
    const email = document.querySelector('#register-email').value;
    const phone_number = document.querySelector('#register-number').value;
    const password = document.querySelector('#register-pw').value;


    // Missing fields
    if (!username) {
        missingFieldRegister('username');
    };
    if (!password){
        missingFieldRegister('password')
    };
    if (!email) {
        missingFieldRegister('email')
    };
    if (!phone_number) {
        missingFieldRegister('phone number')
    }

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
            document.location.replace('/dashboard');
            console.log('successful register');
        } else {
            alert(response.statusText)
        }    
        if (username && email && password) {
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
                document.location.replace('/dashboard');
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
