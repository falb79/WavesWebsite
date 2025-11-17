/*
Collage of Computer Science and Engineering
Waves Cruise - Project Course: CCSW321 - Web Development

Project Description:
This project is a web application for "Waves Cruise,"
aimed at providing an engaging and user-friendly platform for customers to explore and book cruise services. 

Date: 05/11/2024
*/

//------constants
const form = document.getElementById("contactForm");
const successMessage = document.getElementById("success-message");

// store field validation rules and messages
const fields = [
  { id: "name", pattern: /^[a-zA-Z\s]+$/, errorMessage: ["Name must contain letters only"] },
  { id: "gender", errorMessage: "Please select your gender." },
  { id: "mobile", pattern: /^(\+9665|9665)\d{8}$/, errorMessage: "Mobile number must be in the format 9665XXXXXXXX or +9665XXXXXXXX." },
  { id: "dob", errorMessage: "Please select your date of birth." },
  { id: "email", pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, errorMessage: "Please enter a valid email address." },
  { id: "language", errorMessage: "Please select your language." },
  { id: "message", minLength: 10, errorMessage: "Message must be at least 10 characters long." },
];

//--------functions
// Validate individual field
function validateField({ id, pattern, minLength, errorMessage }) {
  const input = document.getElementById(id);
  const errorElement = input.nextElementSibling;
  const value = input.value.trim();

  let isValid = true;
  if (!value || (minLength && value.length < minLength) || (pattern && !pattern.test(value))) {
    errorElement.textContent = Array.isArray(errorMessage) ? errorMessage.find(msg => msg.includes("at least") || msg.includes("must")) : errorMessage;
    isValid = false;
  }

  input.classList.toggle("error", !isValid);
  errorElement.style.display = isValid ? "none" : "block";

  return isValid;
}

//---------event listeners
//form submission event listener
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const isFormValid = fields.every(validateField);

  if (isFormValid) {
    //Collect form data
    const formData = Object.fromEntries(fields.map(({ id }) => [id, document.getElementById(id).value]));
    
    //Send data to the server
    fetch("/submit-contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          successMessage.style.display = "block";
        } else {
          alert("Failed to submit message: " + data.message);
        }
      })
      .catch(error => console.error("Error:", error));
  } else {
    successMessage.style.display = "none";
  }
});
