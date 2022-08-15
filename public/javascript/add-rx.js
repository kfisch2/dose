async function addRx(event) {
    event.preventDefault();

    const rx = document.querySelector('input[name="rx-name"]').value;
    const cost = document.querySelector('input[name="rx-cost"]').value;
    const date_prescribed = document.querySelector(
        'input[name="fill-date"]'
    ).value;
    const refill_date = document.querySelector(
        'input[name="refill-date"]'
    ).value;
    const diagnosis_id = document.querySelector('input[name="med-diag"]').value;

    const response = await fetch(`/api/prescriptions`, {
        method: 'POST',
        body: JSON.stringify({
            rx,
            cost,
            date_prescribed,
            refill_date,
            diagnosis_id,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-rx').addEventListener('submit', addRx);
