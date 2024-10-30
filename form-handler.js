document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    const formSuccess = document.getElementById("form-success");
    const formError = document.getElementById("form-error");

    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevent default form submission
        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: formData // Send as FormData instead of JSON
            });

            if (response.ok) {
                formSuccess.style.display = "block";
                formError.style.display = "none";
                contactForm.reset(); // Clear form fields
            } else {
                formError.style.display = "block";
                formSuccess.style.display = "none";
            }
        } catch (error) {
            console.error("Error:", error);
            formError.style.display = "block";
            formSuccess.style.display = "none";
        }
    });
});
