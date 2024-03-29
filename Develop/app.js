const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
var employees = [];
// Create a new Manager
inquirer
  .prompt([
    {
      message: "What is your manager's name?",
      name: "name",
      type: "input",
    },
    {
      message: "What is your manager's id?",
      name: "id",
      type: "input",
    },
    {
      message: "What is your manager's email",
      name: "email",
      type: "input",
    },
    {
      message: "What is your manager's office number?",
      name: "officeNumber",
      type: "input",
    },
  ])
  .then(function (response) {
    var newManager = new Manager(
      response.name,
      response.id,
      response.email,
      response.officeNumber
    );
    employees.push(newManager);
    var exit = false;

    // Start Loop
    while ((exit = false)) {
      moreEmployees();
    }
    moreEmployees();
  });

// render.render(employees);
function moreEmployees() {
  // Ask which type of employee
  inquirer
    .prompt([
      {
        message: "What type of employee would you like to add?",
        name: "role",
        type: "list",
        choices: ["Engineer", "Intern", "None"],
      },
    ])
    .then(function (response) {
      if (response.role === "Engineer") {
        inquirer
          .prompt([
            {
              message: "What is your engineer's name?",
              name: "name",
              type: "input",
            },
            {
              message: "What is your engineer's id?",
              name: "id",
              type: "input",
            },
            {
              message: "What is your engineer's email",
              name: "email",
              type: "input",
            },
            {
              message: "What is your engineer's github username?",
              name: "github",
              type: "input",
            },
          ])
          .then(function (response) {
            var newEngineer = new Engineer(
              response.name,
              response.id,
              response.email,
              response.github
            );
            employees.push(newEngineer);
            moreEmployees();
          });
      } else if (response.role === "Intern") {
        inquirer
          .prompt([
            {
              message: "What is your intern's name?",
              name: "name",
              type: "input",
            },
            {
              message: "What is your intern's id?",
              name: "id",
              type: "input",
            },
            {
              message: "What is your intern's email?",
              name: "email",
              type: "input",
            },
            {
              message: "What is your intern's school?",
              name: "school",
              type: "input",
            },
          ])
          .then(function (response) {
            var newIntern = new Intern(
              response.name,
              response.id,
              response.email,
              response.school
            );
            employees.push(newIntern);
            moreEmployees();
          });
      } else if (response.role === "None") {
        exit = true;
        console.log("Your team is complete!");
      

        fs.writeFile(outputPath, render(employees), function(err) {
          if(err) {
              throw err;
          }
    
        });
        
      }
    });

}

  
  
// };

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
