// Trigger bootstrap alert function
const missingFieldEditRX = (field) => {
    const alertPlaceholder = document.querySelector('.emptyDate-alert');
    const alert = (message, type) => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-dismiss="alert" aria-label="Close"></button>',
        ].join('');
        alertPlaceholder.append(wrapper);
    };
    alert(`${field} required`, 'danger');
};

async function editPrescription(event) {
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

    if (!refill_date) {
        missingFieldEditRX('Refill Date');
    }

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
    }
}

document
    .querySelector('.edit-prescription-form')
    .addEventListener('submit', editPrescription);
