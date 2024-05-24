class ModelUser {
  constructor(a, b, c) {
    this.id_user = Math.random();
    this.username = a;
    this.password = b;
    this.email = c;
  }
}

module.exports = ModelUser;
