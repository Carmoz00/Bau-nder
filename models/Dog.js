class ModelDog {
  constructor(sesso, eta, nome, razza, pedigree, luogo, descrizione, immagine) {
    this.id_dog = Math.random();
    this.sesso = sesso;
    this.eta = eta;
    this.nome = nome;
    this.razza = razza;
    this.pedigree = pedigree;
    this.luogo = luogo;
    this.descrizione = descrizione;
    this.immagine = immagine;
  }

  toPlainObject() {
    return {
      id_dog: this.id_dog,
      sesso: this.sesso,
      eta: this.eta,
      nome: this.nome,
      razza: this.razza,
      pedigree: this.pedigree,
      luogo: this.luogo,
      descrizione: this.descrizione,
      immagine: this.immagine,
    };
  }

  static fromPlainObject(obj) {
    const dog = new ModelDog(
      obj.sesso,
      obj.eta,
      obj.nome,
      obj.razza,
      obj.pedigree,
      obj.luogo,
      obj.descrizione,
      obj.immagine
    );
    dog.id_dog = obj.id_dog;
    return dog;
  }
}

export { ModelDog };
