type MultipleEvents = {
  probabilitiesArray: number[];
  arraySize?: undefined;
} | {
  probabilitiesArray?: undefined;
  arraySize: number;
}

interface PoissonDistribution {
  lambda: number;
  alpha: number;
}

export abstract class Random {
  static generate = (min = 0, max = 1) => Math.random() % (max - min) + min;
  static getBoolean = (probability = 0.5) => Math.random() < probability;
  static getFromMultipleEvents = ({ probabilitiesArray, arraySize }: MultipleEvents) => {
    let A = this.generate();
    let i = -1;

    if (!probabilitiesArray) {
      const probability = 1 / arraySize;
      probabilitiesArray = [];
      for (let j = 0; j < arraySize; j++) {
        probabilitiesArray.push(probability);
      }
    }

    do {
      A -= probabilitiesArray[++i];
    } while (A > 0);

    return i;
  };
  static poissonDistribution = (lambda: number) => {
    let m = -1, S = 0;

    do {
      m++;
      const a = this.generate();
      S += Math.log(a);
    } while (S >= -lambda);

    return m;
  };
}
