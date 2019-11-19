import Piece from "./piece";

class Knight extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = "knight";
    this.display = `<i data-color=${side} class="fas fa-chess-knight ${side}"></i>`;
    this._vector = this._side == "white" ? -1 : 1; // 1 to góra -1 to dół
  }

  // Filtrowanie ruchów wykraczających poza szachownice
  filterOutBoardMoves(possibleMoves) {
    return possibleMoves.filter(element => {
      return (0 <= element[0] && element[0] <= 7 && 0 <= element[1] && element[1] <= 7);
    });
  }

  // Główna metoda, w której trzeba zapisać wszystkie możliwe ruchy danej bierki
  findLegalMoves(board) {
    const x = this._x; // row
    const y = this._y; // column
    const v = this._vector // up/down

    const upMoves = [
      [x + 2 * v, y - 1],
      [x + 2 * v, y + 1]
    ]

    const downMoves = [
      [x - 2 * v, y - 1],
      [x - 2 * v, y + 1]
    ]

    const leftMoves = [
      [x + v, y - 2],
      [x - v, y - 2]
    ]

    const rightMoves = [
      [x + v, y + 2],
      [x - v, y + 2]
    ]

    const allMoves = upMoves.concat(downMoves).concat(leftMoves).concat(rightMoves)
    return this.filterOutBoardMoves(allMoves);
  }
}

export default Knight;