interface Game {
  readonly title: string;
  genre: string;
  stockAmount: number;
  tags: string[];
  getSimilar: (title: string) => void;
}


interface DLC extends Game {
  originalGame: Game;
  metadata: string[]
}

const LOL: Game = {
  title: 'League of Legends',
  genre: 'RPG',
  stockAmount: 30,
  tags: ['lol', 'br', 'hu3'],
  getSimilar (title: string) {
    console.log(`${title} is similar to Mu Gnn`)
  }
}