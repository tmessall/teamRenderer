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

function askNewEmployee() {
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
                const newEmployee = new Intern(response2.name, response2.id, response2.email, response3.school);
                empArr.push(newEmployee);
                if (response3.more) {
                    askNewEmployee();
                } else {
                    console.log("No more employees");
                    render(empArr);
                    fs.writeFile("index.html", render(empArr), err => {
                        if (err) {
                            console.log("There was an error writing the file.");
                        } else {
                            console.log("File written as index.html.");
                        }
                    });
                }
            })
        } else {
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
                const newEmployee = new Engineer(response2.name, response2.id, response2.email, response3.school);
                empArr.push(newEmployee);
                if (response3.more) {
                    askNewEmployee();
                } else {
                    console.log("No more employees");
                    fs.writeFile("index.html", render(empArr), err => {
                        if (err) {
                            console.log("There was an error writing the file.");
                        } else {
                            console.log("File written as index.html.");
                        }
                    });
                }
            })
        }
    });
}


var newEmps = true;
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
        const newMgr = new Manager(response1.name, response1.id, response1.email, response1.officeNum);
        empArr = [newMgr];
        askNewEmployee();
    } catch (err) {
        console.log("There was an error.");
    }
});




// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
