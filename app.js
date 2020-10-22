const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let empArr = [];

// Recursive function that keeps going until employees are done
function askNewEmployee() {
    // Basic questions applying to any generic employee
    inquirer.prompt([
        {
            type: "list",
            message: "What type of employee is this team member?",
            choices: ["Intern", "Engineer"],
            name: "role"
        },
        {
            type: "input",
            message: "What's this employee's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What's this employee's id?",
            name: "id"
        },
        {
            type: "input",
            message: "What's this employee's email?",
            name: "email"
        }
    ]).then(response2 => {
        // Ask intern specific questions
        if (response2.role === "Intern") {
            inquirer.prompt([
                {
                    type: "input",
                    message: "What's this intern's school?",
                    name: "school"
                },
                {
                    type: "confirm",
                    message: "Are there any more employees?",
                    name: "more"
                }
            ]).then(response3 => {
                // Make and add the intern
                const newEmployee = new Intern(response2.name, response2.id, response2.email, response3.school);
                empArr.push(newEmployee);
                // Add more employees if needed
                if (response3.more) {
                    askNewEmployee();
                } else {
                    // Create the html file
                    console.log("No more employees");
                    render(empArr);
                    fs.writeFile("team.html", render(empArr), err => {
                        if (err) {
                            console.log("There was an error writing the file.");
                        } else {
                            console.log("File written as team.html.");
                        }
                    });
                }
            })
        } else {
            // Engineer specific questions
            inquirer.prompt([
                {
                    type: "input",
                    message: "What's this engineer's github?",
                    name: "school"
                },
                {
                    type: "confirm",
                    message: "Are there any more employees?",
                    name: "more"
                }
            ]).then(response3 => {
                // Make and add the engineer
                const newEmployee = new Engineer(response2.name, response2.id, response2.email, response3.school);
                empArr.push(newEmployee);
                // Add more employees if needed
                if (response3.more) {
                    askNewEmployee();
                } else {
                    // Create the html file
                    console.log("No more employees");
                    fs.writeFile("team.html", render(empArr), err => {
                        if (err) {
                            console.log("There was an error writing the file.");
                        } else {
                            console.log("File written as team.html.");
                        }
                    });
                }
            })
        }
    });
}

// Starts with manager questions
inquirer.prompt([
    {
        type: "input",
        message: "What's the team manager's name?",
        name: "name"
    },
    {
        type: "input",
        message: "What's the team manager's id?",
        name: "id"
    },
    {
        type: "input",
        message: "What's the team manager's email?",
        name: "email"
    },
    {
        type: "input",
        message: "What's the team manager's office number?",
        name: "officeNum"
    }
]).then(response1 => {
    try {
        // Make and add the manager to empArr
        const newMgr = new Manager(response1.name, response1.id, response1.email, response1.officeNum);
        empArr = [newMgr];
        askNewEmployee();
    } catch (err) {
        console.log("There was an error.");
    }
});