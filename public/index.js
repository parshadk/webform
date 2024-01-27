function submitForm() {
    document.getElementById("loader-overlay").style.display = "flex";

    const formData = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        age: document.getElementById("age").value,
        gender: document.getElementById("gender").value,
    };

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById("loader-overlay").style.display = "none";
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById("loader-overlay").style.display = "none";
    });
    document.getElementById("userDataForm").reset();
}
