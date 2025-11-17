/*
Collage of Computer Science and Engineering
Waves Cruise - Project Course: CCSW321 - Web Development

Project Description:
This project is a web application for "Waves Cruise,"
 aimed at providing an engaging and user-friendly platform for customers to explore and book cruise services. 

Date: 05/11/2024
 */

const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const path = require("path");

const app = express(); //instance of express
const port = 2500; //port number

//Middleware to accept data in Json format
app.use(bodyParser.json());


//serve files
app.use("/", express.static(path.join(__dirname, "../HTML")));
app.use("/css", express.static(path.join(__dirname, "../CSS")));
app.use("/media", express.static(path.join(__dirname, "../Media")));
app.use("/js", express.static(path.join(__dirname, "../JS")));

// database connection to MySQL 
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", //different for every device
    database: "waves_cruise",
});
db.connect((err) => {
    if (err) {
        console.error("Database connection failed in:", err);
        return;
    }
    console.log("Connected successfully to MySql.");
});

// Validate and store reservation data
app.post("/submit-reservation", (req, res) => {
    const { name, email, phone, adults, package, departure, return: returnDate, total } = req.body;

    // Data validation
    if (!name || !email || !phone || !adults || !package || !departure || !returnDate || !total) {
        res.status(400).json({ success: false, message: "All fields are required." });
        return;
    }

    if (!/^[a-zA-Z\s]{1,50}$/.test(name)) {
        res.status(400).json({ success: false, message: "Name must be a string with no numbers or special characters, and not exceed 50 letters." });
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        res.status(400).json({ success: false, message: "Invalid email format." });
        return;
    }

    if (!/966\d{9}/.test(phone)) {
        res.status(400).json({ success: false, message: "Invalid phone number format." });
        return;
    }

    if (adults < 1 || adults > 10) {
        res.status(400).json({ success: false, message: "num of people must be a number between 1 and 10." });
        return;
    }

    if (isNaN(Date.parse(departure))) {
        res.status(400).json({ success: false, message: "Departure must be a valid date." });
        return;
    }

    if (isNaN(Date.parse(returnDate))) {
        res.status(400).json({ success: false, message: "Return date must be a valid date." });
        return;
    }

    // Save to database
    const query =
        `INSERT INTO reservations (name, email, phone, adults, package, departure, return_date, total)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(
        query, [name, email, phone, adults, package, departure, returnDate, total],
        (err, result) => {
            if (err) {
                console.error("Failed to insert reservation:", err);
                res.status(500).json({ success: false, message: "Insertion error" });
                return;
            }
            res.status(200).json({ success: true });
        }
    );
});

//Handle contact-us form submissions
app.post("/submit-contact", (req, res) => {
    const { name, gender, mobile, dob, email, language, message } = req.body;

    //Data validation
    if (!name || !gender || !mobile || !dob || !email || !language || !message) {
        res.status(400).json({ success: false, message: "All fields are required." });
        return;
    }

    if (!/^[a-zA-Z\s]{1,50}$/.test(name)) {
        res.status(400).json({ success: false, message: "Name must be a string with no numbers or special characters, and not exceed 50 letters." });
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        res.status(400).json({ success: false, message: "Invalid email format." });
        return;
    }
    if (!/^\+?9665\d{8}$/.test(mobile)) {
        res.status(400).json({ success: false, message: "Invalid phone number format." });
        return;
    }
    if (isNaN(Date.parse(dob))) {
        res.status(400).json({ success: false, message: "Date of Birth must be a valid date." });
        return;
    }
    if (message.length < 10 || message.length > 500) {
        res.status(400).json({ success: false, message: "Message must be at least 10 characters and not more 500 chars." });
        return;
    }

    // Save to database
    const query = `
        INSERT INTO contact_us (name, gender, mobile, dob, email, language, message)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(query, [name, gender, mobile, dob, email, language, message], (err, result) => {
        if (err) {
            console.error("Failed to insert contact form data:", err);
            res.status(500).json({ success: false, message: "Insertion error" });
            return;
        }
        res.status(200).json({ success: true, message: "Contact form submitted successfully!" });
    });
});

// View packages data
app.get("/view", (req, res) => {
    const query = "SELECT package_id, package_name, DATE_FORMAT(package_date, '%b %d, %Y') AS formatted_date, package_info, package_price, package_duration FROM packages;";
  
    db.query(query, (error, result) => {
      if (error) throw error;

      res.json(result);
    });
  });

//start the server and listen to port
app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
});
