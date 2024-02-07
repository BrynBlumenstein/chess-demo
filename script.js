const WHITE_PAWN = '♙';
const WHITE_ROOK = '♖';
const WHITE_KNIGHT = '♘';
const WHITE_BISHOP = '♗';
const WHITE_QUEEN = '♕';
const WHITE_KING = '♔';

const BLACK_PAWN = '♟';
const BLACK_ROOK = '♜';
const BLACK_KNIGHT = '♞';
const BLACK_BISHOP = '♝';
const BLACK_QUEEN = '♛';
const BLACK_KING = '♚';

const TILES_PER_RANK = 8;
const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

main();


function main() {
    // Board creation and initialization
    const whiteTiles = createTiles('-w');
    const whiteBoard = document.querySelector('#white-board');
    createBoard(whiteBoard, whiteTiles);

    const blackTiles = createTiles('-b').reverse();
    const blackBoard = document.querySelector('#black-board');
    createBoard(blackBoard, blackTiles);

    const allTiles = document.querySelectorAll('.tile');
    initBoards(allTiles);
    allTiles.forEach(tile => {
        tile.addEventListener('click', tileClickHandler);
    });

    // Game logic
    let whiteTurn = true;
    let blackTurn = false;
}

function createTiles(idTag) {
    let tiles = [];
    let counter, tile;
    for (let rank of ranks) {
        if (rank % 2 == 0) counter = 0;
        else counter = 1;
        for (let file of files) {
            tile = createTile(idTag, rank, file, counter);
            tiles.push(tile);
            counter++;
        }
    }
    return tiles;
}

function createTile(idTag, rank, file, counter) {
    const tile = document.createElement('div');
    tile.style.width = `calc(100% / ${TILES_PER_RANK})`;
    tile.style.height = `calc(100% / ${TILES_PER_RANK})`;
    tile.id = `${file}${rank}${idTag}`;
    tile.classList.add('tile');
    if (counter % 2 == 0) tile.classList.add('light');
    else tile.classList.add('dark');
    return tile;
}

function createBoard(board, tiles) {
    tiles.forEach(tile => board.appendChild(tile));
}

function initBoards(tiles) {
    let coordinates;
    tiles.forEach(tile => {
        coordinates = tile.id.slice(0, 2);
        initPiece(tile, coordinates);
    });
}

function initPiece(tile, coordinates) {
    let file = coordinates[0];
    let rank = coordinates[1];

    if (rank == '7') tile.innerHTML = BLACK_PAWN;
    else if (rank == '2') tile.innerHTML = WHITE_PAWN;
    else if (rank == '8') {
        if (file == 'a' || file == 'h') tile.innerHTML = BLACK_ROOK;
        else if (file == 'b' || file == 'g') tile.innerHTML = BLACK_KNIGHT;
        else if (file == 'c' || file == 'f') tile.innerHTML = BLACK_BISHOP;
        else if (file == 'd') tile.innerHTML = BLACK_QUEEN;
        else if (file == 'e') tile.innerHTML = BLACK_KING;
    } else if (rank == '1') {
        if (file == 'a' || file == 'h') tile.innerHTML = WHITE_ROOK;
        else if (file == 'b' || file == 'g') tile.innerHTML = WHITE_KNIGHT;
        else if (file == 'c' || file == 'f') tile.innerHTML = WHITE_BISHOP;
        else if (file == 'd') tile.innerHTML = WHITE_QUEEN;
        else if (file == 'e') tile.innerHTML = WHITE_KING;
    }
}

function tileClickHandler() {
    const tile = this;
    console.log(tile);
}

/**
 * Notes:
 * 
 */