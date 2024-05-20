class ModelUser {
  constructor(username, password, email) {
    this.id_user = Math.random();
    this.username = username;
    this.password = password;
    this.email = email;
  }
}

module.exports = ModelUser;
