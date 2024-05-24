class ModelDog {
  constructor(sesso, eta, nome, razza, pedigree, luogo, descrizione) {
    this.id_dog = Math.random();
    this.sesso = sesso;
    this.nome = nome;
    this.razza = razza;
    this.pedigree = pedigree;
    this.luogo = luogo;
    this.descrizione = descrizione;
  }
}

module.exports = ModelDog;
