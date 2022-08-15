async function editPrescription(event) {
    event.preventDefault();

    const medication = document.querySelector('input[name="rx-name"]').value;
    const cost = document.querySelector('input[name="rx-cost"]').value;
    const fillDate = document.querySelector('input[name="fill-date"]').value;
    const refillDate = document.querySelector('input[name="refill-date"]').value;
    const diagnosis = document.querySelector('input[name="med-diag"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/prescriptions/${id}`, {
        method: 'PUT',
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
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-rx').addEventListener('submit', editPrescription);