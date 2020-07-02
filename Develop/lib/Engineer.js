// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
  }
  getName() {
    console.log(this.name);
  }
  getId() {
    console.log(this.id);
  }
  getEmail() {
    console.log(this.email);
  }
  getGithub() {
    console.log(this.github);
  }
  getRole() {}
}

module.exports = Engineer;
