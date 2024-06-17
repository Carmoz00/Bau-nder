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

  addDogToUser(userId, dogId) {
    const user = this.getUserById(userId);
    if (user) {
      user.dogIds.push(dogId);
      this.saveUsers();
    }
  }

  getRequestsSent(userId) {
    const user = this.getUserById(userId);
    return user ? user.richiesteInviate : [];
  }

  getRequestsReceived(userId) {
    const user = this.getUserById(userId);
    return user ? user.richiesteRicevute : [];
  }

  getMatches(userId) {
    const user = this.getUserById(userId);
    return user ? user.listaMatch : [];
  }
}

export { ControllerUsers };
