import Cat from "../pieces/cat";
import King from "../pieces/king";

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

  createAndSetKings(side) {
    const row = side === "white" ? 7 : 0;
    for (let i = 0; i < 8; i++) {
      this[row][3] = new King(row, i, side);
    }
  }

  // metoda inicjalizująca

  init() {
    this.createSecondLevel();

    const colors = ["white", "black"];

    for (let i = 0; i < colors.length; i++) {
      this.createAndSetCats(colors[i]);
      this.createAndSetKings(colors[i]);
    }
  }
}
