async function addDiagnosis(event) {
    event.preventDefault();

    const diagnosis_name = document.querySelector('input[name="med-diag"]').value;

    const response = await fetch(`/api/diagnosis`, {
        method: 'POST',
        body: JSON.stringify({
            diagnosis_name
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

document.querySelector('.new-diagnosis').addEventListener('submit', addDiagnosis);
