document.addEventListener("DOMContentLoaded", function () {
    // Get all "View" buttons
    const viewButtons = document.querySelectorAll("table button");
    const modal = document.getElementById("orderModal");
    const modalContent = document.querySelector(".modal-content");
    const closeModalButton = document.querySelector(".close");

    // Add click event listener to each "View" button
    viewButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const row = this.parentElement.parentElement;
            const orderId = row.cells[0].innerText;
            const customerName = row.cells[1].innerText;
            const foodItem = row.cells[2].innerText;
            const status = row.cells[3].innerText;

            // Display order details in the modal
            modalContent.innerHTML = `
                <span class="close">&times;</span>
                <h3>Order Details</h3>
                <p><strong>Order ID:</strong> ${orderId}</p>
                <p><strong>Customer Name:</strong> ${customerName}</p>
                <p><strong>Food Item:</strong> ${foodItem}</p>
                <p><strong>Status:</strong> ${status}</p>
                <button id="confirmButton">Confirm Order</button>
                <button id="cancelButton">Cancel Order</button>
            `;

            // Open the modal
            modal.style.display = "block";

            // Add functionality to confirm and cancel buttons
            document.getElementById("confirmButton").addEventListener("click", function () {
                row.cells[3].innerText = "Completed";
                modal.style.display = "none";
            });

            document.getElementById("cancelButton").addEventListener("click", function () {
                row.cells[3].innerText = "Cancelled";
                modal.style.display = "none";
            });

            // Close the modal when the 'x' is clicked
            document.querySelector(".close").addEventListener("click", function () {
                modal.style.display = "none";
            });
        });
    });

    // Close the modal when clicking outside of it
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
