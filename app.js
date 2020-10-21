const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const managerPrompt = [
  {
    type: "input",
    message: "Begin by choosing a manager.",
    name: "manager_name",
  },
  {
    type: "input",
    message: "Manager email?",
    name: "manager_email",
  },
  {
    type: "input",
    message: "Manager ID?",
    name: "manager_id",
  },
  {
    type: "input",
    message: "Manager office number?",
    name: "manager_office_number",
  },
  {
    type: "list",
    message: "Would you like to add an intern or an engineer?",
    name: "new_entry",
    choices: ["engineer", "intern", "no thanks"],
  },
];
const internPrompt = [
  {
    type: "input",
    message: "Name an intern.",
    name: "intern_name",
  },
  {
    type: "input",
    message: "Intern email?",
    name: "intern_email",
  },
  {
    type: "input",
    message: "Intern ID?",
    name: "intern_id",
  },
  {
    type: "input",
    message: "What school do they attend?",
    name: "intern_school_name",
  },
  {
    type: "list",
    message: "Would you like to add an intern or an engineer?",
    name: "new_entry",
    choices: ["engineer", "intern", "no thanks"],
  },
];
const engineerPrompt = [
  {
    type: "input",
    message: "Name an engineer.",
    name: "engineer_name",
  },
  {
    type: "input",
    message: "Engineer email?",
    name: "engineer_email",
  },
  {
    type: "input",
    message: "Engineer ID?",
    name: "engineer_id",
  },
  {
    type: "input",
    message: "Engineer github account?",
    name: "engineer_github_account",
  },
  {
    type: "list",
    message: "Would you like to add an intern or an engineer?",
    name: "new_entry",
    choices: ["engineer", "intern", "no thanks"],
  },
];

let employees = [];

function generateManager() {
  inquirer.prompt(managerPrompt).then((answers) => {
    answers.role = "manager";
    let manager = new Manager(
      answers.manager_name,
      answers.role,
      answers.manger_id,
      answers.manager_office_number
    );
    employees.push(manager);
    if (answers.new_entry === "intern") {
      generateIntern();
    } else if (answers.new_entry === "engineer") {
      generateEngineer();
    } else {
      render(employees);
    }
  });
}

function generateIntern() {
  inquirer.prompt(internPrompt).then((answers) => {
    answers.role = "intern";
    let intern = new Intern(
      answers.intern_name,
      answers.role,
      answers.intern_id,
      answers.intern_school_name
    );
    employees.push(intern);
    if (answers.new_entry === "intern") {
      generateIntern();
    } else if (answers.new_entry === "engineer") {
      generateEngineer();
    } else {
      generateHTML(employees);
    }
  });
}

function generateEngineer() {
  inquirer.prompt(engineerPrompt).then((answers) => {
    answers.role = "engineer";
    const engineer = new Engineer(
      answers.engineer_name,
      answers.role,
      answers.engineer_id,
      answers.engineer_github_account
    );
    employees.push(engineer);
    if (answers.new_entry === "intern") {
      generateIntern();
    } else if (answers.new_entry === "engineer") {
      generateEngineer();
    } else {
      generateHTML(employees);
    }
  });
}

function generateHTML(employees) {
  fs.writeFile(outputPath, render(employees), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(response);
    }
  });
}

generateManager();
