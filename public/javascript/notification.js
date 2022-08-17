async function notificationBtn(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    console.log(id);

    const response = await fetch(`/twilio/${id}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        window.alert(
            'Notification will be sent via text before you need to refill'
        );
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document
    .querySelector('#notification-btn')
    .addEventListener('click', notificationBtn);
