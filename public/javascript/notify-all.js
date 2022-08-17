async function notifyAll(event) {
    event.preventDefault();

    const response = await fetch(`/twilio`, {
        method: 'get',
        headers: {
            'Content-Type': 'applocation/json',
        },
    });

    if (response.ok) {
        twilioAlert();
    } else {
        alert(response.statusText);
    }
};


const twilioAlert = () => {
    const alertPlaceholder = document.querySelector('#notify-all-btn');
    const alert = (message, type) => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-dismiss="alert" aria-label="Close"></button>',
        ].join('');
        alertPlaceholder.append(wrapper);
    };
    alert(`You will receive a text reminder for all your prescriptions 3 days before the refill date`, 'warning');
};

document.querySelector('#notify-all-btn').addEventListener('click', notifyAll);
