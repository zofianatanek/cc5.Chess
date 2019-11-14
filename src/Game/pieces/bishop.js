import Piece from "./piece";

class Bishop extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = "Bishop";
    this.display = `<i data-color=${side} class= "fas fa-chess-bishop ${side}"></i>`;
    this.vector = this._side == "white" ? -1 : 1; // 1 to góra -1 to dół
  }

  // Metoda filtrująca ruchy wychodzące poza szachownicę 
  filterMoves(arr) {
    let filteredMoves = arr.filter(elem => {
      elem[0] >= 0 && elem[0] <= 7 && elem[1] >= 0 && elem[1] <= 7
        ? (elem = true)
        :(elem = false);
    return elem;
  });
  return filteredMoves
}

// Metoda znajdująca wszystkie ruchy i zwracająca przefiltrowaną tablicę zawierającą 4 tablice z ruchami w możliwych kierunkach
findAllMoves(x, y) {

  const x = this._x;
  const y = this._y;

  let upLeft = [];
  let upRight = [];
  let downLeft = [];
  let downRight = [];
  let allMoves = [];
  for (let i = 1; i < 8; i++) {
    upLeft.push([x - i, y - i]);
    downLeft.push([x + i, y - i]);
    upRight.push([x - i, y + i]);
    downRight.push([x + i, y + i]);
  }
  allMoves.push(this.filterMoves(upLeft), this.filterMoves(downLleft), this.filterMoves(upRight), this.filterMoves(downRight));
  return allMoves
}

findLegalMoves(board) {

  let legalMoves = this.findAllMoves(x, y)
  return legalMoves;
}
}

export default Bishop;
