async function notifyAll(event) {
    event.preventDefault();

    const response = await fetch(`/twilio`, {
        method: 'get',
        headers: {
            'Content-Type': 'applocation/json',
        },
    });

    if (response.ok) {
        window.alert(
            'You will receive a text reminder for all your prescriptions 3 days before the refill date'
        );
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#notify-all-btn').addEventListener('click', notifyAll);
