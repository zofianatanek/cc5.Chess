import Piece from "./piece";

class Bishop extends Piece {
    constructor (x, y, side) {
        super(x, y, side);
        this.name = "Bishop";
        this.display = `<i data-color=${side} class= "fas fa-chess-bishop ${side}"></i>`;
        this.vector = this._side == "white" ? -1 : 1; // 1 to góra -1 to dół
    }
}

// Filtrowanie ruchów wykraczających poza szachownice


// Metoda znajdująca wszystkie ruchy bez filtrów


export default Bishop