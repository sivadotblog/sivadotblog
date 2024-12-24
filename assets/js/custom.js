// Handle contact form submission
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    const form = document.querySelector('.contact-form');
    console.log('Form element:', form);

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('Form submitted');

            // Disable submit button to prevent double submission
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            // Get form data in IFTTT webhook format
            const formData = {
                "value1": form.querySelector("#name").value,
                "value2": form.querySelector("#email").value,
                "value3": form.querySelector("#message").value
            };

            try {
                console.log('Form data being sent:', formData);
                const response = await fetch('https://maker.ifttt.com/trigger/contact_form_submitted/json/with/key/cbs4WhYzlh-WLE1lGeGdVM', {
                    method: 'POST',
                    //mode: 'no-cors', // Add no-cors mode to handle CORS issues
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                console.log('Response status:', response.status);
                console.log('Response type:', response.type);

                // In no-cors mode, we won't get response details but if we reach here, the request was sent
                form.innerHTML = '<div class="alert alert-success">Thank you for your message! I will get back to you soon.</div>';

            } catch (error) {
                console.error('Network error:', error);
                submitButton.disabled = false;
                submitButton.textContent = 'Submit';
                const errorDiv = document.createElement('div');
                errorDiv.className = 'alert alert-danger';
                errorDiv.textContent = 'Sorry, there was an error sending your message. Please try again later.';
                form.insertBefore(errorDiv, form.firstChild);
            }
        });
    }
});
