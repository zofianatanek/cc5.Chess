import Piece from "./piece";

class Rook extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = "rook";
    this.display = `<i data-color=${side} class="fas fa-chess-rook ${side}"></i>`;
    this._vector = this._side == "white" ? -1 : 1; // 1 to góra -1 to dół
  }

  // Filtrowanie ruchów wykraczających poza szachownice
  filterOutBoardMoves(possibleMoves) {}

  // Główna metoda, w której trzeba zapisać wszystkie możliwe ruchy danej bierki
  findLegalMoves(board) {
    //console.log(board);
  }
}

export default Rook;
