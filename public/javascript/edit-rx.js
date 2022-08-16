async function editPrescription(event) {
    console.log('clicked');
    event.preventDefault();

    // const rx = document.querySelector('input[name="rx-name"]').value;
    const cost = document.querySelector('input[name="update-cost"]').value;
    // const date_prescribed = document.querySelector('input[name="fill-date"]').value;
    const refill_date = document.querySelector(
        'input[name="update-refill-date"]'
    ).value;
    // const diagnosis_id = document.querySelector('input[name="med-diag"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    console.log(cost, refill_date);

    const response = await fetch(`/api/prescriptions/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            // rx,
            cost,
            // date_prescribed,
            refill_date,
            // diagnosis_id,
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

document
    .querySelector('.edit-prescription-form')
    .addEventListener('submit', editPrescription);
