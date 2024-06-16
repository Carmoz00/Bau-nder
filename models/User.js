class ModelUser {
  constructor(username, password, email, phone) {
    this.id_user = Math.random();
    this.username = username;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.dogIds = [];
    this.richiesteInviate = [];
    this.richiesteRicevute = [];
    this.listaMatch = [];
  }

  toPlainObject() {
    return {
      id_user: this.id_user,
      username: this.username,
      password: this.password,
      email: this.email,
      phone: this.phone,
      dogIds: this.dogIds,
      richiesteInviate: this.richiesteInviate,
      richiesteRicevute: this.richiesteRicevute,
      listaMatch: this.listaMatch,
    };
  }

  static fromPlainObject(obj) {
    const user = new ModelUser(
      obj.username,
      obj.password,
      obj.email,
      obj.phone
    );
    user.id_user = obj.id_user;
    user.dogIds = obj.dogIds;
    user.richiesteInviate = obj.richiesteInviate;
    user.richiesteRicevute = obj.richiesteRicevute;
    user.listaMatch = obj.listaMatch;
    return user;
  }
}

export { ModelUser };
