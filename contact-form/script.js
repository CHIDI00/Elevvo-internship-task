document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const successMessage = document.getElementById("successMessage");

  // Form fields
  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const subject = document.getElementById("subject");
  const message = document.getElementById("message");

  // Error message elements
  const fullNameError = document.getElementById("fullNameError");
  const emailError = document.getElementById("emailError");
  const subjectError = document.getElementById("subjectError");
  const messageError = document.getElementById("messageError");

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Clear error styling and messages
  function clearErrors() {
    const inputs = [fullName, email, subject, message];
    const errors = [fullNameError, emailError, subjectError, messageError];

    inputs.forEach((input) => {
      input.classList.remove("input-error");
    });

    errors.forEach((error) => {
      error.classList.remove("show");
    });

    successMessage.classList.remove("show");
  }

  // Show error for specific field
  function showError(input, errorElement, message) {
    input.classList.add("input-error");
    errorElement.textContent = message;
    errorElement.classList.add("show");
  }

  // Validate individual field
  function validateField(field) {
    const value = field.value.trim();

    switch (field.id) {
      case "fullName":
        if (!value) {
          showError(field, fullNameError, "Please enter your full name");
          return false;
        }
        break;

      case "email":
        if (!value) {
          showError(field, emailError, "Please enter your email address");
          return false;
        } else if (!emailRegex.test(value)) {
          showError(field, emailError, "Please enter a valid email address");
          return false;
        }
        break;

      case "subject":
        if (!value) {
          showError(field, subjectError, "Please enter a subject");
          return false;
        }
        break;

      case "message":
        if (!value) {
          showError(field, messageError, "Please enter your message");
          return false;
        }
        break;
    }
    return true;
  }

  // Real time validation on blur
  [fullName, email, subject, message].forEach((field) => {
    field.addEventListener("blur", function () {
      // Clear previous error for this field
      field.classList.remove("input-error");
      const errorElement = document.getElementById(field.id + "Error");
      errorElement.classList.remove("show");

      // Validate if field has content
      if (field.value.trim()) {
        validateField(field);
      }
    });

    // Clear error styling on focus
    field.addEventListener("focus", function () {
      field.classList.remove("input-error");
      const errorElement = document.getElementById(field.id + "Error");
      errorElement.classList.remove("show");
    });
  });

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Clear previous errors
    clearErrors();

    // Validate all fields
    let isValid = true;
    const fields = [fullName, email, subject, message];

    fields.forEach((field) => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    if (isValid) {
      // Simulate form submission
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      // Simulate API call delay
      setTimeout(() => {
        // Show success message
        successMessage.classList.add("show");

        // Reset form
        form.reset();

        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";

        // Scroll to top to show success message
        successMessage.scrollIntoView({ behavior: "smooth" });

        // Hide success message after 5 seconds
        setTimeout(() => {
          successMessage.classList.remove("show");
        }, 5000);
      }, 1500);
    } else {
      // Scroll to first error
      const firstError = document.querySelector(".input-error");
      if (firstError) {
        firstError.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        firstError.focus();
      }
    }
  });
});
