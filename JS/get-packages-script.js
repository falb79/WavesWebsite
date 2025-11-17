/*
Collage of Computer Science and Engineering
Waves Cruise - Project Course: CCSW321 - Web Development

Project Description:
This project is a web application for "Waves Cruise," 
aimed at providing an engaging and user-friendly platform for customers to explore and book cruise services. 

Instructor: Wed Abu Zenadah
Section: CA2
Lujain Bajunaid 2216627
Manal Almalki 2218207
Fatima Lajam 2216608
Layan Aljohani 2210459
Date: 05/11/2024
*/

function getData() {
    // Get the elements to store information in
    let package1_date = document.getElementById("package1-date");
    let package1_name = document.getElementById("package1-title");
    let package1_info = document.getElementById("package1-desc");
    let package1_price = document.getElementById("package1-price");
    let package1_duration = document.getElementById("package1-duration");

    let package2_date = document.getElementById("package2-date");
    let package2_name = document.getElementById("package2-title");
    let package2_info = document.getElementById("package2-desc");
    let package2_price = document.getElementById("package2-price");
    let package2_duration = document.getElementById("package2-duration");

    let package3_date = document.getElementById("package3-date");
    let package3_name = document.getElementById("package3-title");
    let package3_info = document.getElementById("package3-desc");
    let package3_price = document.getElementById("package3-price");
    let package3_duration = document.getElementById("package3-duration");

    // Create lists to store corresponding information from DB
    let dates = [];
    let titles = [];
    let info = [];
    let prices = [];
    let durations = [];

    // Fetch information from JSON file
    fetch("/view")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Iterate thrrough each row to extract information
            data.forEach(function (package) {
                dates.push(package.formatted_date);
                titles.push(package.package_name);
                info.push(package.package_info);
                prices.push(package.package_price);
                durations.push(package.package_duration);
            });
            // Finally append the correct data to its element 
            package1_date.appendChild(document.createTextNode(dates[0]));
            package1_name.appendChild(document.createTextNode(titles[0]));
            package1_info.appendChild(document.createTextNode(info[0]));
            package1_price.appendChild(document.createTextNode(prices[0]));
            package1_duration.appendChild(document.createTextNode(durations[0]));

            package2_date.appendChild(document.createTextNode(dates[1]));
            package2_name.appendChild(document.createTextNode(titles[1]));
            package2_info.appendChild(document.createTextNode(info[1]));
            package2_price.appendChild(document.createTextNode(prices[1]));
            package2_duration.appendChild(document.createTextNode(durations[1]));

            package3_date.appendChild(document.createTextNode(dates[2]));
            package3_name.appendChild(document.createTextNode(titles[2]));
            package3_info.appendChild(document.createTextNode(info[2]));
            package3_price.appendChild(document.createTextNode(prices[2]));
            package3_duration.appendChild(document.createTextNode(durations[2]));
        })
        .catch(function (error) {
            console.error("Error:", error);
            alert("An error occurred!");
        });
}
// Calling the function
getData();
