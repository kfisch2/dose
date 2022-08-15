async function deleteRx(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/prescriptions.${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.deleteRx-btn').addEventListener('click', deleteRx);
