import Game from "./Game/game";
import '../bootstrap/css/bootstrap.min.css'
import '../styles/style.css'


// w tym pliku prawdopodobnie będzie tylko inicjalizacja gry

const game = new Game("board", "promotion");
game.init();
