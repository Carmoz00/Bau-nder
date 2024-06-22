import ControllerUsers from "./controllers/User.js";
import ControllerDogs from "./controllers/Dog.js";

class App {
  constructor() {
    this.users = new ControllerUsers();
    this.dogs = new ControllerDogs();
    this.session = null;
  }

  signup(username, password, email, phone) {
    if (this.users.findByEmail(email)) {
      console.log("Email già in uso");
      return "Email già in uso";
    }
    if (!this.validateEmail(email)) {
      console.log("Email non valida");
      return "Email non valida";
    }
    if (username === password) {
      console.log("Username e password non possono essere uguali");
      return "Username e password non possono essere uguali";
    }
    if (password.length < 8) {
      console.log("Password troppo corta");
      return "Password troppo corta";
    }
    this.users.createUser(username, password, email, phone);
    console.log("Registrazione completata con successo");
    return "Registrazione completata con successo";
  }

  login(email, password) {
    const user = this.users.authenticate(email, password);
    if (user) {
      this.session = user;
      console.log("Login effettuato correttamente");
      return "Login effettuato correttamente";
    } else {
      console.log("Email o password errati");
      return "Email o password errati";
    }
  }

  logout() {
    this.session = null;
    console.log("Logout effettuato correttamente");
    return "Logout effettuato correttamente";
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  showDogs() {
    console.log(this.dogs.getDogs());
  }

  filterDogs(sesso, eta, razza, pedigree, luogo) {
    const filters = { sesso, eta, razza, pedigree, luogo };
    this.temp_dogs = this.dogs.getDogs().filter((dog) => {
      return Object.keys(filters).every((key) => {
        if (filters[key] !== undefined) {
          return dog[key] === filters[key];
        }
        return true;
      });
    });
    console.log(this.temp_dogs);
  }

  createDogForUser(
    userId,
    sesso,
    eta,
    nome,
    razza,
    pedigree,
    luogo,
    descrizione,
    immagine
  ) {
    const dogId = this.dogs.create(
      sesso,
      eta,
      nome,
      razza,
      pedigree,
      luogo,
      descrizione,
      immagine,
      userId
    );
    this.users.addDogToUser(userId, dogId);
  }

  getUserDogs(userId) {
    return this.dogs.getDogsByUserId(userId);
  }

  getDogInfo(dogId) {
    return this.dogs.getDogById(dogId);
  }

  updateDog(dogId, updates) {
    this.dogs.updateDog(dogId, updates);
  }

  deleteDogInfo(dogId) {
    this.dogs.dogs = this.dogs.dogs.filter((dog) => dog.id_dog !== dogId);
    this.dogs.saveDogs();
  }
  getRequestsSent(userId) {
    return this.users.getRequestsSent(userId);
  }

  getRequestsReceived(userId) {
    return this.users.getRequestsReceived(userId);
  }

  getMatches(userId) {
    return this.users.getMatches(userId);
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

  updateProfile(updatedUser) {
    console.log("Profilo aggiornato:", updatedUser);
    return "Profilo aggiornato con successo!";
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

const app = new App();

export { app };

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
