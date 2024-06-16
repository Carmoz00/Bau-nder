import { ModelUser } from "../models/User.js";
class ControllerUsers {
  constructor() {
    this.users = JSON.parse(localStorage.getItem("users")) || [];
  }

  saveUsers() {
    localStorage.setItem("users", JSON.stringify(this.users));
  }

  createUser(username, password, email, phone) {
    const user = new ModelUser(username, password, email, phone);
    this.users.push(user);
    this.saveUsers();
  }

  getUserByUsername(username) {
    return this.users.find((user) => user.username === username);
  }

  getUserById(id) {
    return this.users.find((user) => user.id_user === id);
  }
}

export { ControllerUsers };
