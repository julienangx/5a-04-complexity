//Optimisation d'Algorithmes dans un Cas Concret
//Recherche d'un Artiste --------------------------------
interface Artist {
    id: string;
    name: string;
}
  
function findArtistIndex(artists: Artist[], name: string): string {
    for (let i = 0; i < artists.length; i++) {
      if (artists[i].name === name) {
        return artists[i].id;
      }
    }
    return '-1';
}

function findArtistIndexOptimized(artists: Artist[], name: string): string {
  //diviser la liste en 2
  const middle = Math.floor(artists.length / 2);
  const left = artists.slice(0, middle);
  const right = artists.slice(middle);

  if (name === artists[middle].name) {
    return artists[middle].id;
  }

  if (name < artists[middle].name) {
    return findArtistIndexOptimized(left, name);
  } else {
    return findArtistIndexOptimized(right, name);
  }

  
}

//Outils de test du pire cas

//Création de la liste des artistes 
console.log("Création de la liste des artistes");

const listeDePrenoms = ["John", "Jane", "Alice", "Bob", "Charlie", "David", "Eve", "Frank", "George", "Helen", "Ivy", "Jack", "Kate", "Leo", "Mia", "Noah", "Olivia", "Paul", "Quinn", "Ryan", "Sarah", "Tom", "Uma", "Victor", "Wendy", "Xavier", "Yara", "Zach", "Ava", "Benjamin", "Chloe", "Daniel", "Emma", "Fiona", "George", "Hannah", "Ian", "Julia", "Kevin", "Laura", "Michael", "Nina", "Oliver", "Patricia", "Quentin", "Rachel", "Samuel", "Tara", "Ulysses", "Victoria", "William", "Xander", "Yvonne", "Zane"];
  const listeDeNoms = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts"];

  const listeDesArtistes: Artist[] = [];
  for (let i = 0; i < 100000; i++) {
    const artist = {
      id: `${i}`,
      name: `${listeDePrenoms[Math.floor(Math.random() * listeDePrenoms.length)]} ${listeDeNoms[Math.floor(Math.random() * listeDeNoms.length)]}`
    }
    listeDesArtistes.push(artist);
  }


  listeDesArtistes.push({
    id: `${100000}`,
    name: "Julien Angenieux"
  });

  listeDesArtistes.sort((a, b) => a.name.localeCompare(b.name));

  console.log("Exercice 1.1: --------------------------------");

  console.log("Liste des artistes créée");

  //Test de la fonction findArtistIndex
  console.log("Test de la fonction findArtistIndex");
  const startTime = performance.now();
  const result = findArtistIndex(listeDesArtistes, "Julien Angenieux");
  const endTime = performance.now();
  console.log(`Résultat: ${result}`);
  console.log(`Temps d'exécution: ${endTime - startTime} ms`);

  //Test de la fonction findArtistIndexOptimized
  console.log("Test de la fonction findArtistIndexOptimized");
  const startTimeOptimized = performance.now();
  const resultOptimized = findArtistIndexOptimized(listeDesArtistes, "Julien Angenieux");
  const endTimeOptimized = performance.now();
  console.log(`Résultat: ${resultOptimized}`);
  console.log(`Temps d'exécution: ${endTimeOptimized - startTimeOptimized} ms`);


  console.log("--------------------------------");

//Attribution des Scènes aux Artistes --------------------------------
interface Artist2 {
  id: string;
  name: string;
  genre: string;
  stage: string;
}

interface Stage {
  id: string;
  name: string;
  genres: Array<string>;
}

function assignStages(artists: Artist2[], stages: Stage[]): void {
  for (let stage of stages) {
    for (let artist of artists) {
      if (stage.genres.includes(artist.genre)) {
        artist.stage = stage.id;
        break;
      }
    }
  }
}

function assignStagesOptimized(artists: Artist2[], stages: Stage[]): void {
    const genreToStage = new Map<string, string>();
    
    for (const stage of stages) {
        for (const genre of stage.genres) {
            if (!genreToStage.has(genre)) {
                genreToStage.set(genre, stage.id);
            }
        }
    }
    
    for (const artist of artists) {
        const stageId = genreToStage.get(artist.genre);
        if (stageId) {
            artist.stage = stageId;
        }
    }
} 

//Outils de test du pire cas

//Création de la liste des artistes, des stages et des genres
console.log("Création de la liste des artistes, des stages et des genres");

const listeDePrenoms2 = ["John", "Jane", "Alice", "Bob", "Charlie", "David", "Eve", "Frank", "George", "Helen", "Ivy", "Jack", "Kate", "Leo", "Mia", "Noah", "Olivia", "Paul", "Quinn", "Ryan", "Sarah", "Tom", "Uma", "Victor", "Wendy", "Xavier", "Yara", "Zach", "Ava", "Benjamin", "Chloe", "Daniel", "Emma", "Fiona", "George", "Hannah", "Ian", "Julia", "Kevin", "Laura", "Michael", "Nina", "Oliver", "Patricia", "Quentin", "Rachel", "Samuel", "Tara", "Ulysses", "Victoria", "William", "Xander", "Yvonne", "Zane"];
const listeDeNoms2 = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts"];
const listeDeGenres = ["Rock", "Pop", "Jazz", "Classique", "Electro", "Hip-Hop", "Rap", "Country", "Blues", "Funk", "Soul", "Reggae", "Salsa", "Tango", "Swing", "Bossa-Nova", "Samba", "Fado", "Ska", "Punk", "Grunge", "Gospel", "RnB", "Disco", "Techno", "House", "Trance", "Techno", "Dubstep", "Drum-and-Bass", "Trance", "House", "Dubstep", "Drum-and-Bass", "Trance", "House", "Dubstep", "Drum-and-Bass"];

const listeDesArtistes2: Artist2[] = [];

for (let i = 0; i < 100000; i++) {
  const artist = {
    id: `${i}`,
    name: `${listeDePrenoms2[Math.floor(Math.random() * listeDePrenoms2.length)]} ${listeDeNoms2[Math.floor(Math.random() * listeDeNoms2.length)]}`,
    genre: listeDeGenres[Math.floor(Math.random() * listeDeGenres.length)],
    stage: ""
  }
}

const listeDesStages: Stage[] = [];

for (let i = 0; i < 100000; i++) {
  const stage = {
    id: `${i}`,
    name: `${listeDePrenoms2[Math.floor(Math.random() * listeDePrenoms2.length)]} ${listeDeNoms2[Math.floor(Math.random() * listeDeNoms2.length)]}`,
  }
}

console.log("Liste des artistes, des stages et des genres créée");

//Test de la fonction assignStages
console.log("Test de la fonction assignStages");
const startTimeAssignStages = performance.now();
const resultAssignStages = assignStages(listeDesArtistes2, listeDesStages);
const endTimeAssignStages = performance.now();
console.log(`Temps d'exécution: ${endTimeAssignStages - startTimeAssignStages} ms`);

//Test de la fonction assignStagesOptimized
console.log("Test de la fonction assignStagesOptimized");
const startTimeAssignStagesOptimized = performance.now();
const resultAssignStagesOptimized = assignStagesOptimized(listeDesArtistes2, listeDesStages);
const endTimeAssignStagesOptimized = performance.now();
console.log(`Temps d'exécution: ${endTimeAssignStagesOptimized - startTimeAssignStagesOptimized} ms`);

console.log("--------------------------------");
