/*
Collage of Computer Science and Engineering
Waves Cruise - Project Course: CCSW321 - Web Development

Project Description:
This project is a web application for "Waves Cruise," 
aimed at providing an engaging and user-friendly platform for customers to explore and book cruise services. 

Date: 05/11/2024
*/

//--------constants
const form = document.getElementById("reservationForm");
const successMessage = document.getElementById("success-message");

// store field validation rules and messages
const fields = [
  { id: "name", pattern: /^[a-zA-Z\s]+$/, errorMessage: ["Name must contain letters only"] },
  { id: "email", pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, errorMessage: "Please enter a valid email address." },
  { id: "phone", pattern: /^(\+9665|9665)\d{8}$/, errorMessage: "Mobile number must be in the format 9665XXXXXXXX or +9665XXXXXXXX." },
  { id: "adults", min: 1, max: 10, errorMessage: "Number of people must be between 1 and 10." },
  { id: "package", errorMessage: "Please select a package." },
  { id: "departure"},
  {id: "return"},
  {id: "total"}
];

// store Package details 
const packageDetails = {
  package1: { departure: "2024-11-10", return: "2024-11-14", pricePerPerson: 330 },
  package2: { departure: "2024-11-20", return: "2024-11-22", pricePerPerson: 250 },
  package3: { departure: "2024-12-01", return: "2024-12-04", pricePerPerson: 300 },
};


//-------------functions
// function to Set dates and total price when a package is selected
function setDates() {
  const packageSelect = document.getElementById("package").value;
  const departureField = document.getElementById("departure");
  const returnField = document.getElementById("return");
  const totalField = document.getElementById("total");

  if (packageDetails[packageSelect]) {
    const { departure, return: returnDate, pricePerPerson } = packageDetails[packageSelect];
    departureField.value = departure;
    returnField.value = returnDate;

    const numOfPeople = parseInt(document.getElementById("adults").value) || 0;
    totalField.value = `$${numOfPeople * pricePerPerson}`;
  } else {
    [departureField.value, returnField.value, totalField.value] = ["", "", ""];
  }
}

// function to validate individual fields
function validateField({ id, pattern, minLength, min, max, errorMessage }) {
  const input = document.getElementById(id);
  const errorElement = input.nextElementSibling;
  const value = input.value.trim();
  let isValid = true;

  //Check pattern, min length, and numeric range if possible
  if ((pattern && !pattern.test(value)) || (minLength && value.length < minLength) || (min && value < min) || (max && value > max)) {
    errorElement.textContent = Array.isArray(errorMessage) ? errorMessage[0] : errorMessage;
    isValid = false;
  }

  //update frontend based on validation results
  input.classList.toggle("error", !isValid);
  errorElement.style.display = isValid ? "none" : "block";

  return isValid;
}

//-----------Event listeners 
// event listener for updating dates and total price
document.getElementById("adults").addEventListener("input", setDates);
// event listener for form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isFormValid = fields.every(validateField);

  if (isFormValid) {
    //Collects form data
    const formData = Object.fromEntries(fields.map(({ id }) => [id, document.getElementById(id).value]));
    //Send data to the server
    fetch("/submit-reservation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          successMessage.style.display = "block"; //Display success message
        
          //to ensure the message is displayed before alert
          setTimeout(() => {
            alert(`Reservation information 
              \nName: ${formData.name}
              \nEmail: ${formData.email}
              \nPhone: ${formData.phone}
              \nNum of people: ${formData.adults}
              \nPackage: ${formData.package}
              \nDep date: ${formData.departure}
              \nReturn date: ${formData.return}
              \ntotal: ${formData.total}`);
            form.reset(); // Reset the form after successful submission
          }, 100); 
        } else {
          alert(`Failed to submit reservation: ${data.message}`);
        }
      })
      .catch(console.error);
  } else {
    successMessage.style.display = "none";
  }
});


