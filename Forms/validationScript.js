    // JavaScript code for form validation
	// Prevent form from submitting

      // Retrieve the form element
    const form = document.getElementById("myForm");

    // Retrieve the input field element
    const inputField = document.getElementById("inputField");

    // Add event listener to form submit
    form.addEventListener("submit", function(event) {

        // Prevent form from submitting automatically
        event.preventDefault();

        // Get input value
        const inputValue = inputField.value;

        // Regular expression for alphanumeric only (letters + numbers, no spaces)
        const alphanumericPattern = /^[a-zA-Z0-9]+$/;

        // Check if input matches pattern
        if (alphanumericPattern.test(inputValue)) {

            // Valid input
            alert("Form submitted successfully! Input is valid.");

            // Optional: clear the field after "submission"
            inputField.value = "";

        } else {

            // Invalid input
            alert("Error: Please enter alphanumeric characters only (letters and numbers, no spaces or symbols).");

        }

    });