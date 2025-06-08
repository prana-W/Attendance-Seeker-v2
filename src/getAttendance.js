const puppeteer = require('puppeteer');
const fs = require('fs');
require('dotenv').config();

// Scrap data from the site of a particular user and save it to a JSON file.
const getAttendance = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://online.nitjsr.ac.in/endsem/Login.aspx');

    // Set screen size
    // await page.setViewport({width: 2000, height: 1000});

    // Logging in to the site
    await page.type('input[name="txtuser_id"]', process.env.USER_ID);
    await page.type('input[name="txtpassword"]', process.env.USER_PASSWORD);
    await page.click('input[name="btnsubmit"]');

    await page.waitForNavigation();

    await page.goto('https://online.nitjsr.ac.in/endsem/StudentAttendance/ClassAttendance.aspx')

    // TODO: As of now, I have hardcoded the index of the td elements to be selected. This can be improved by using a more dynamic approach.
    let tdElements = (await page.$$eval('td', (elements) => {
        return elements
            .filter((element, index) =>
                element !== null && index > 9
            )
            .map((element) => {
                return element.innerText
            })
    }));

// Making a class for a Subject
    class Subject {
        constructor(serial_number, subject_code, subject_name, faculty_name, total_classes, attendance) {

            this.serial_number = serial_number;
            this.subject_code = subject_code;
            this.subject_name = subject_name;
            this.faculty_name = faculty_name;
            this.total_classes = total_classes;
            this.attendance = attendance;
        }
    }

    let jsonData = [];

    for (let i = 0; i < tdElements.length; i += 7) {

        jsonData.push(new Subject(...tdElements.slice(i, i + 7)));

    }
    // Remove the last useless object
    jsonData.pop()
    const extraInformation = {
        user: process.env.USER_ID,
        date: new Date().toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }),
        current_time: new Date().toLocaleTimeString()
    }
    jsonData.unshift(extraInformation)

    // return raw JSON data
    return jsonData;

    // Writes all the attendance data to a JSON file (asynchronously).
    // fs.writeFile('./attendance.json', JSON.stringify(jsonData), (err) => {
    //     if (err) {
    //         console.error('Error writing file:', err);
    //     } else {
    //         console.log('File has been written successfully');
    //     }
    // })

};

module.exports = getAttendance;