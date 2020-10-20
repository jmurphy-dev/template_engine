// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(name, email, role, github) {
    super(name, email, role);
    this.github = github;
    this.role = "Engineer";
  }
  getGithub() {
    return this.github;
  }
}

module.exports = Engineer;
