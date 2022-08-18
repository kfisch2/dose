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
        twilioAlert();
    } else {
        alert(response.statusText);
    }
};

//allert when user opts into twilio
const twilioAlert = () => {
    const alertPlaceholder = document.querySelector('.twilio-alert');
    const alert = (message, type) => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-dismiss="alert" aria-label="Close">X</button>',
        ].join('');
        alertPlaceholder.append(wrapper);
    };
    alert(`Notification will be sent via text three days before you need to refill`, 'warning');
};

document
    .querySelector('#notification-btn')
    .addEventListener('click', notificationBtn);
