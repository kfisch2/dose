async function addRx(event) {
    event.preventDefault();

    const medication = document.querySelector('input[name="rx-name"]').value;
    const cost = document.querySelector('input["rx-cost"]').value;
    const fillDate = document.querySelector('input[name="fill-date"]')
    const refillDate = document.querySelector('input[name="refill-date"]').value;
    const diagnosis = document.querySelector('input[name="med-diag"]').value;

    const response = await fetch(`/api/prescriptions`, {
        method: 'POST',
        body: JSON.stringify({
            medication,
            cost,
            fillDate,
            refillDate,
            diagnosis,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }  
}

document.querySelector('.new-rx').addEventListener('submit', addRx);