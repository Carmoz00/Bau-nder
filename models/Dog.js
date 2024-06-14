class ModelDog {
  constructor(sesso, eta, nome, razza, pedigree, luogo, descrizione, immagine) {
    this.id_dog = Math.random();
    this.eta = eta;
    this.sesso = sesso;
    this.nome = nome;
    this.razza = razza;
    this.pedigree = pedigree;
    this.luogo = luogo;
    this.descrizione = descrizione;
  }
}

export { ModelDog };
