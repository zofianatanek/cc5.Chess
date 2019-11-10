import Cat from "../pieces/cat";
import King from "../pieces/king";
import Bishop from "../pieces/bishop";

export default class Board extends Array {
  createSecondLevel() {
    for (let i = 0; i < 8; i++) {
      this[i] = new Array(8);
    }
  }

  // tutaj tworzycie nowe obiekty waszych bierek i od razu umieszczacie je na szachownicy
  createAndSetCats(side) {
    const row = side === "white" ? 5 : 2;
    this[row][3] = new Cat(row, 3, side);
  }

  createAndSetKings(side) {
    const row = side === "white" ? 7 : 0;
    this[row][4] = new King(row, 4, side);
  }

  createAndSetBishops(side) {
    const row = side === "white" ? 7 : 0;
    this[row][2] = new Bishop(row, 2, side);
    this[row][5] = new Bishop(row, 5, side);
  }

  // metoda inicjalizująca

  init() {
    this.createSecondLevel();

    const colors = ["white", "black"];

    for (let i = 0; i < colors.length; i++) {
      this.createAndSetCats(colors[i]);
      this.createAndSetKings(colors[i]);
      this.createAndSetBishops(colors[i]);
    }
  }
}
