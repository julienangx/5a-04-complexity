//Outils de test et rapports

//Fonction containsDuplicate --------------------------------
function containsDuplicate(array: any[]) {
    for (let i = 0; i < array.length; i++) {
      for (let j = i + 1; j < array.length; j++) {
        if (array[i] === array[j]) {
          return true;
        }
      }
    }
    return false;
}

function containsDuplicateOptimized(array: any[]) {
    const seen = new Set();
    for (let i = 0; i < array.length; i++) {
      if (seen.has(array[i])) {
        return true;
      }
      seen.add(array[i]);
    }
    return false;
}

//Création de la liste de nombres aléatoires
const listeDeNombres = [];
for (let i = 0; i < 100000; i++) {
    listeDeNombres.push(Math.floor(Math.random() * 10000));
}
//Ajout d'un nombre en double à la fin de la liste (pire cas)
listeDeNombres.push(listeDeNombres[0]);

//Fonction findCommonElements --------------------------------
function findCommonElements(array1: any[], array2: any[]) {
    let commonElements = [];
    for (let i = 0; i < array1.length; i++) {
      for (let j = 0; j < array2.length; j++) {
        if (array1[i] === array2[j]) {
          commonElements.push(array1[i]);
        }
      }
    }
    return commonElements;
}

function findCommonElementsOptimized(array1: any[], array2: any[]) {
    const commonElements = [];
    const map = new Map();

    for (const element of array1) {
        map.set(element, true);
    }

    for (const element of array2) {
        if (map.has(element)) {
            commonElements.push(element);
        }
    }

    return commonElements;
}   

//Création de la liste de nombres aléatoires
const listeDeNombres2 = [];
for (let i = 0; i < 10000; i++) {
    listeDeNombres2.push(Math.floor(Math.random() * 1000000));
}

const listeDeNombres3 = [];
for (let i = 0; i < 10000; i++) {
    listeDeNombres3.push(Math.floor(Math.random() * 1000000));
}

//Fonction fibonacci --------------------------------
function fibonacci(n: number): number {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

function fibonacciOptimized(n: number): number {
    if (n <= 1) return n;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        [a, b] = [b, a + b];
    }
    return b;
}










interface TestResult {
    algorithmName: string;
    averageTime: number;
    totalRuns: number;
}

class PerformanceTestSuite {
    private readonly name: string;
    private algorithms: Map<string, Function>;
    private numberOfRuns: number;
    private results: TestResult[];

    constructor(name: string, numberOfRuns: number = 1000) {
        this.name = name;
        this.algorithms = new Map();
        this.numberOfRuns = numberOfRuns;
        this.results = [];
    }

    addAlgorithm(name: string, algorithm: Function): void {
        this.algorithms.set(name, algorithm);
    }

    setNumberOfRuns(runs: number): void {
        this.numberOfRuns = runs;
    }

    runTests(...params: any[]): void {
        this.results = [];
        
        for (const [name, algorithm] of this.algorithms) {
            let totalTime = 0;
            
            // Exécuter l'algorithme le nombre de fois spécifié
            for (let i = 0; i < this.numberOfRuns; i++) {
                const start = performance.now();
                algorithm(...params);
                const end = performance.now();
                totalTime += (end - start);
            }

            this.results.push({
                algorithmName: name,
                averageTime: totalTime / this.numberOfRuns,
                totalRuns: this.numberOfRuns
            });
        }
    }

    displayResults(): void {
        console.log(`\n=== Résultats des tests pour: ${this.name} ===`);
        console.log(`Nombre d'exécutions par algorithme: ${this.numberOfRuns}\n`);

        // Trier les résultats par temps moyen
        this.results.sort((a, b) => a.averageTime - b.averageTime);

        // Afficher les résultats pour chaque algorithme
        this.results.forEach(result => {
            console.log(`${result.algorithmName}:`);
            console.log(`  Temps moyen: ${result.averageTime.toFixed(4)} ms`);
        });

        // Afficher le plus rapide et le plus lent
        const fastest = this.results[0];
        const slowest = this.results[this.results.length - 1];

        console.log('\nRésumé:');
        console.log(`Plus rapide: ${fastest.algorithmName} (${fastest.averageTime.toFixed(4)} ms)`);
        console.log(`Plus lent: ${slowest.algorithmName} (${slowest.averageTime.toFixed(4)} ms)`);
        
        if (this.results.length > 1) {
            const difference = ((slowest.averageTime - fastest.averageTime) / fastest.averageTime * 100).toFixed(2);
            console.log(`Différence de performance: ${difference}%`);
        }
    }
}

const testSuite = new PerformanceTestSuite("Contains Duplicate");
testSuite.addAlgorithm("Version basique", containsDuplicate);
testSuite.addAlgorithm("Version optimisée", containsDuplicateOptimized);
testSuite.setNumberOfRuns(1000);
testSuite.runTests(listeDeNombres);
testSuite.displayResults();


const testSuite2 = new PerformanceTestSuite("Find Common Elements");
testSuite2.addAlgorithm("Version basique", findCommonElements);
testSuite2.addAlgorithm("Version optimisée", findCommonElementsOptimized);
testSuite2.setNumberOfRuns(100);
testSuite2.runTests(listeDeNombres2, listeDeNombres3);
testSuite2.displayResults();

const testSuite3 = new PerformanceTestSuite("Fibonacci");
testSuite3.addAlgorithm("Version basique", fibonacci);
testSuite3.addAlgorithm("Version optimisée", fibonacciOptimized);
testSuite3.setNumberOfRuns(100);
testSuite3.runTests(15);
testSuite3.displayResults();
