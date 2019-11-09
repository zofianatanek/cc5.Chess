import Cat from "../pieces/cat";
import Pawn from "../pieces/pawn";

export default class Board extends Array {
  createSecondLevel() {
    for (let i = 0; i < 8; i++) {
      this[i] = new Array(8);
    }
  }

  // tutaj tworzycie nowe obiekty waszych bierek i od razu umieszczacie je na szachownicy
  createAndSetCats(side) {
    const row = side === "white" ? 5 : 2;
    for (let i = 0; i < 8; i++) {
      this[row][4] = new Cat(row, i, side);
    }
  }

  // ustawienie pionków
  createAndSetPawns(side) {
    const row = side === "white" ? 6 : 1;
    for (let i = 0; i < 8; i++) {
      this[row][i] = new Pawn(row, i, side);
    }
  }

  // metoda inicjalizująca

  init() {
    this.createSecondLevel();

    const colors = ["white", "black"];

    for (let i = 0; i < colors.length; i++) {
     // this.createAndSetCats(colors[i]);
      this.createAndSetPawns(colors[i]);
    }
  }
}
