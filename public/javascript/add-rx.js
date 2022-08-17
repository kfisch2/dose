// trigger alerts

// empty fields
const missingFieldAddRX = (field) => {
    const alertPlaceholder = document.querySelector('.empty-alert');
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

// incorrect date format
const dateFormatAlert = () => {
    const alertPlaceholder = document.querySelector('.date-alert');
    const alert = (message, type) => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-dismiss="alert" aria-label="Close"></button>',
        ].join('');
        alertPlaceholder.append(wrapper);
    };
    alert(`Please enter date as mm/dd/yyyy`, 'warning');
};

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
    // const diagnosis_id = document.querySelector('input[name="med-diag"]').value;

    if (!rx) {
        missingFieldAddRX('Medication Name');
    };
    if (!date_prescribed) {
        missingFieldAddRX('Medication Fill Date')
    }
    const response = await fetch(`/api/prescriptions`, {
        method: 'POST',
        body: JSON.stringify({
            rx,
            cost,
            date_prescribed,
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
        dateFormatAlert();
    }
}

document.querySelector('.new-rx').addEventListener('submit', addRx);
