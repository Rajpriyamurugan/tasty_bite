// Example JavaScript to handle form submissions
document.addEventListener('DOMContentLoaded', () => {
    const accountForm = document.querySelector('#accountModal form');

    accountForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Capture form data
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const address = document.querySelector('#address').value;

        // Display an alert with the entered data (for demonstration)
        alert(`Account details updated:\nName: ${name}\nEmail: ${email}\nAddress: ${address}`);

        // Logic to send data to the server or update the UI can be added here
    });
});
