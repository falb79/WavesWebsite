/*
Collage of Computer Science and Engineering
Waves Cruise - Project Course: CCSW321 - Web Development

Project Description:
This project is a web application for "Waves Cruise," 
aimed at providing an engaging and user-friendly platform 
for customers to explore and book cruise services. 

Instructor: Wed Abu Zenadah
Section: CA2
Lujain Bajunaid 2216627
Manal Almalki 2218207
Fatima Lajam 2216608
Layan Aljohani 2210459

Date: 05/11/2024
*/

// Get the elements we want to apply the animation on
let sections = document.querySelectorAll("section");

// Function to check if the element is currently visible at the viewport
function is_element_visible_in_viewport(element) {
    // Store element's top position relative to the parent
    const elementTop = element.offsetTop;
    // Store element's offset from the bottom = top position relative to the parent + Viewable height
    const elementBottom = elementTop + element.offsetHeight;
    // Store how many px a page has scrolled from the upper left corner of the window
    const viewportTop = window.scrollY;
    // Store how many px a page has scrolled from the upper left corner of the window + Height of content area
    const viewportBottom = viewportTop + window.innerHeight;

    return (
        // If this is true --> the element is visible in the viewport
        elementBottom > viewportTop &&
        elementTop < viewportBottom
    );
};

// Iterate for each section
sections.forEach((section) => {
    // Add an event listener for when a user scrolls the page
    window.addEventListener('scroll', () => {
        // Check if the element is visible in the viewport
        if (is_element_visible_in_viewport(section)) {
            // Add the slide-in animation
            section.classList.add("show-animation");
        }
    });
});