document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------------------
    // Part 1 & 2: Event Handling & Interactive Features
    // ----------------------------------------------------------------------

    /**
     * Light/Dark Mode Toggle
     * This feature listens for a click on the theme-toggle button and toggles
     * a 'dark-mode' class on the body element to switch the theme.
     */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        // Change button text based on the current theme
        if (body.classList.contains('dark-mode')) {
            themeToggleBtn.textContent = 'Switch to Light Mode';
        } else {
            themeToggleBtn.textContent = 'Switch to Dark Mode';
        }
    });

    /**
     * Collapsible FAQ Section
     * This feature adds a click event listener to all FAQ questions. When a question
     * is clicked, it toggles a 'show' class on the corresponding answer to
     * expand or collapse it, creating a simple accordion effect.
     */
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            // Toggle the 'show' class on the answer
            answer.classList.toggle('show');
            // Toggle the 'active' class on the question for styling changes (e.g., changing the '+' to a '-')
            question.classList.toggle('active');
        });
    });

    // ----------------------------------------------------------------------
    // Part 3: Custom Form Validation
    // ----------------------------------------------------------------------

    /**
     * Custom Form Validation
     * This section handles the form submission and provides custom validation for
     * each input field (name, email, password, and confirm password). It prevents
     * the form from submitting if validation fails and displays specific error messages.
     * It uses the 'novalidate' attribute in HTML to disable default HTML5 validation.
     */
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const successMessage = document.getElementById('form-success-message');

    // Helper function to display error messages
    const displayError = (inputElement, errorMessage) => {
        const errorSpan = document.getElementById(`${inputElement.id}-error`);
        errorSpan.textContent = errorMessage;
        inputElement.classList.add('invalid');
    };

    // Helper function to clear error messages
    const clearError = (inputElement) => {
        const errorSpan = document.getElementById(`${inputElement.id}-error`);
        errorSpan.textContent = '';
        inputElement.classList.remove('invalid');
    };

    // Main validation function
    const validateForm = () => {
        let isValid = true;

        // Clear all previous errors
        clearError(nameInput);
        clearError(emailInput);
        clearError(passwordInput);
        clearError(confirmPasswordInput);
        successMessage.textContent = '';

        // Name validation (must not be empty and be at least 3 characters)
        if (nameInput.value.trim().length < 3) {
            displayError(nameInput, 'Name must be at least 3 characters long.');
            isValid = false;
        }

        // Email validation using a simple regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            displayError(emailInput, 'Please enter a valid email address.');
            isValid = false;
        }

        // Password validation (must be at least 8 characters)
        if (passwordInput.value.length < 8) {
            displayError(passwordInput, 'Password must be at least 8 characters.');
            isValid = false;
        }

        // Confirm password validation (must match the password field)
        if (confirmPasswordInput.value !== passwordInput.value) {
            displayError(confirmPasswordInput, 'Passwords do not match.');
            isValid = false;
        }

        return isValid;
    };

    // Event listener for form submission
    form.addEventListener('submit', (e) => {
        // Prevent default form submission
        e.preventDefault();

        // Run validation
        if (validateForm()) {
            // If validation passes, show a success message
            successMessage.textContent = 'Form submitted successfully! 🎉';
            form.reset(); // Reset the form fields
        } else {
            // If validation fails, the error messages are already displayed
            successMessage.textContent = ''; // Ensure success message is cleared
        }
    });

    // Optional: Add 'keyup' event listeners for real-time validation feedback
    // This provides a better user experience by validating as they type.
    nameInput.addEventListener('keyup', () => {
        if (nameInput.value.trim().length >= 3) {
            clearError(nameInput);
        }
    });

    emailInput.addEventListener('keyup', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(emailInput.value.trim())) {
            clearError(emailInput);
        }
    });
    
    passwordInput.addEventListener('keyup', () => {
        if (passwordInput.value.length >= 8) {
            clearError(passwordInput);
        }
    });
    
    confirmPasswordInput.addEventListener('keyup', () => {
        if (confirmPasswordInput.value === passwordInput.value) {
            clearError(confirmPasswordInput);
        }
    });
});