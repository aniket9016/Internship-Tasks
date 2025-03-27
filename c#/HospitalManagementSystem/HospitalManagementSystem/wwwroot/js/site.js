function openDoctorModal(doctorId) {
    fetch('/Doctors/AddOrEdit/' + doctorId)
        .then(response => response.text())
        .then(data => {
            document.getElementById('doctorModalBody').innerHTML = data;
            new bootstrap.Modal(document.getElementById('doctorModal')).show();
        })
        .catch(error => alert("Error loading doctor form."));
}

function saveDoctor() {
    const form = document.getElementById('doctorForm');
    const formData = new FormData(form);

    fetch('/Doctors/SaveDoctor', {
        method: 'POST',
        body: new URLSearchParams(new FormData(form))
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                bootstrap.Modal.getInstance(document.getElementById('doctorModal')).hide();
                location.reload();
            } else {
                alert(data.message);
            }
        })
        .catch(error => alert("Error saving doctor."));
}

function deleteDoctor(doctorId) {
    if (confirm('Are you sure you want to delete this doctor?')) {
        fetch('/Doctors/Delete/' + doctorId, { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                if (data.success) location.reload();
                else alert("Error deleting doctor.");
            })
            .catch(error => alert("Error deleting doctor."));
    }
}
