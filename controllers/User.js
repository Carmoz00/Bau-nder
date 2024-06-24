import ModelUser from "../models/User.js";

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

  findByEmail(email) {
    return this.users.find((user) => user.email === email);
  }

  getUserByUsername(username) {
    return this.users.find((user) => user.username === username);
  }

  getUserById(id) {
    console.log(`Cercando utente con ID: ${id}`);
    const user = this.users.find((user) => user.id_user === id);
    console.log(`Utente trovato: ${JSON.stringify(user)}`);
    return user;
  }

  authenticate(email, password) {
    const user = this.findByEmail(email);
    return user && user.password === password ? user : null;
  }

  addDogToUser(userId, dogId) {
    const user = this.getUserById(userId);
    alert(user.username);
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

export default ControllerUsers;
