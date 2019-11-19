import Piece from "./piece";

class Rook extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = "rook";
    this.display = `<i data-color=${side} class="fas fa-chess-rook ${side}"></i>`;
    this._vector = this._side == "white" ? -1 : 1; // 1 to góra -1 to dół
  }

  // Filtrowanie ruchów wykraczających poza szachownice

  findAllMoves(x, y) {
    let up = [];
    let down = [];
    let left = [];
    let right = [];
    let allMoves = [];
    for (let i = 1; i < 8; i++) {
      up.push([x - i, y]);
      down.push([x + i, y]);
      left.push([x, y - i]);
      right.push([x, y + i]);
    }
    return (allMoves = up.concat(down, left, right));
  }

  // Główna metoda, w której trzeba zapisać wszystkie możliwe ruchy danej bierki
  findLegalMoves(board) {
    // console.log(board);
    const x = this._x;
    const y = this._y;
    let legalMoves = this.findAllMoves(x, y).filter(el => {
      el[0] >= 0 && el[0] < 8 && el[1] >= 0 && el[1] < 8
        ? (el = true)
        : (el = false);
      return el;
    });
    return legalMoves;
  }
}

export default Rook;
