export default class BoardView {
  constructor(boardContainer) {
    this._boardElement = boardContainer;
  }

  _createSquares(board) {
    for (let x = 0; x < board.length; x++) {
      for (let y = 0; y < board[x].length; y++) {
        const square = document.createElement("div");
        square.dataset.id = `${x}-${y}`;
        square.dataset.x = `${x}`;
        square.dataset.y = `${y}`;
        square.innerHTML = `${x}, ${y}`; // by lepiej widzieć indeksy
        square.className += x % 2 == y % 2 ? "light" : "dark";
        square.classList.add("square");
        this._boardElement.appendChild(square);
      }
    }
  }

  _displayPieces(board) {
    // Iterujemy po wszystkich elementach (empty jest pomijany w iteracji) tablicy board
    board.forEach((row, rowIndex) => {
      row.forEach((piece, squareIndex) => {
        let el = this._boardElement.querySelector(`[data-id="${rowIndex}-${squareIndex}"]`);
        el.innerHTML = (piece === null) ? `${el.dataset.x}, ${el.dataset.y}` : piece.display ? piece.display : "ERROR";
      });
    });
  }

  highlightSquares(squares) {
    if (!squares) return;
    squares.forEach(position => {
      var el = this._boardElement
        .querySelector(`[data-id="${position[0]}-${position[1]}"]`);
      el.classList.add("highlighted");
      //King-castling
      if (position[2]) {
        el.dataset.castlingX = position[3];
        el.dataset.castlingY = position[4];
      }


    });
  }

  removeAllHighlights() {
    let allSquares = board.querySelectorAll('.board *');
    allSquares.forEach(square => {
      square.classList.remove("highlighted");
      //King-castling
      square.removeAttribute('data-castling-x');
      square.removeAttribute('data-castling-y');
    })
  }

  init(board) {
    this._createSquares(board);
    this._displayPieces(board);
  }
}