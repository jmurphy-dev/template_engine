// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, age, email,) {
        if (!name) {
            throw new Error("You are missing the name.");
          }
          if (!age) {
            throw new Error("You are missing the age.");
          }
          if (!email) {
            throw new Error("You are missing the email address.");
          }
          this.name = name;
          this.age = age;
          this.email = email;
    }
}