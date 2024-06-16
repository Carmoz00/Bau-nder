import ControllerUsers from "./class/User.js";
import ControllerDogs from "./class/Dogs.js";

class App {
  constructor() {
    this.users = new ControllerUsers();
    this.dogs = new ControllerDogs();
  }

  showDogs() {
    console.log(this.dogs.dogs);
  }

  filterDogs(sesso, eta, razza, pedigree, luogo) {
    const filters = { sesso, eta, razza, pedigree, luogo };
    this.temp_dogs = this.dogs.dogs.filter((dog) => {
      return Object.keys(filters).every((key) => {
        if (filters[key] !== undefined) {
          return dog[key] === filters[key];
        }
        return true;
      });
    });
    console.log(this.temp_dogs);
  }

  matchRequest(user1Id, dog1Id, user2Id, dog2Id) {
    const user1 = this.users.getUserById(user1Id);
    const user2 = this.users.getUserById(user2Id);

    if (user1 && user2) {
      user1.richiesteInviate.push({ userId: user2Id, dogId: dog2Id });
      user2.richiesteRicevute.push({ userId: user1Id, dogId: dog1Id });

      this.users.saveUsers();
      console.log("Richiesta di match inviata.");
    } else {
      console.log("Utente non trovato.");
    }
  }

  acceptMatch(user2Id, user1Id) {
    const user1 = this.users.getUserById(user1Id);
    const user2 = this.users.getUserById(user2Id);

    if (user1 && user2) {
      const request = user2.richiesteRicevute.find(
        (req) => req.userId === user1Id
      );
      if (request) {
        user1.listaMatch.push(user2Id);
        user2.listaMatch.push(user1Id);

        user1.richiesteInviate = user1.richiesteInviate.filter(
          (req) => req.userId !== user2Id
        );
        user2.richiesteRicevute = user2.richiesteRicevute.filter(
          (req) => req.userId !== user1Id
        );

        this.users.saveUsers();

        console.log("Match effettuato!");
        console.log(
          `Contatti di ${user1.username}: Email - ${user1.email}, Telefono - ${user1.phone}`
        );
        console.log(
          `Contatti di ${user2.username}: Email - ${user2.email}, Telefono - ${user2.phone}`
        );
      } else {
        console.log("Richiesta di match non trovata.");
      }
    } else {
      console.log("Utente non trovato.");
    }
  }
}

/* COMANDI BROWSER

  // Creazione di utenti e cani
  app.users.createUser('user1', 'password1', 'user1@example.com', '1234567890');
  app.users.createUser('user2', 'password2', 'user2@example.com', '0987654321');

  app.dogs.create('M', 3, 'Fido', 'Labrador', true, 'Palermo', 'Amichevole', 'img1.jpg');
  app.dogs.create('F', 5, 'Bella', 'Bulldog', true, 'Catania', 'Dolce', 'img2.jpg');

  // Invio di una richiesta di match
  const user1 = app.users.getUserByUsername('user1');
  const user2 = app.users.getUserByUsername('user2');
  const dog1 = app.dogs.dogs[0];
  const dog2 = app.dogs.dogs[1];

  app.matchRequest(user1.id_user, dog1.id_dog, user2.id_user, dog2.id_dog);

  // Accettazione di una richiesta di match
  app.acceptMatch(user2.id_user, user1.id_user);

*/
