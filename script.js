/**
 * ------------------
 * Constants
 * ------------------
 */

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

const whitePieces = [WHITE_PAWN, WHITE_ROOK, WHITE_KNIGHT, WHITE_BISHOP, WHITE_QUEEN, WHITE_KING];
const blackPieces = [BLACK_PAWN, BLACK_ROOK, BLACK_KNIGHT, BLACK_BISHOP, BLACK_QUEEN, BLACK_KING];
const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];


/**
 * ------------------
 * Main
 * ------------------
 */

// Board creation and initialization
const whiteTiles = createTiles('-w');
const whiteBoard = document.querySelector('#white-board');
createBoard(whiteBoard, whiteTiles);

const blackTiles = createTiles('-b').reverse();
const blackBoard = document.querySelector('#black-board');
createBoard(blackBoard, blackTiles);

const allTiles = document.querySelectorAll('.tile');
initBoards(allTiles);

const display = document.querySelector('#display');

allTiles.forEach(tile => {
    tile.addEventListener('click', tileClickHandler);
});

// Game logic variables
let whiteTurn = true;
let blackTurn = false;
let selected = null;
let start = null;
let end = null;
let lastMovedFrom = null;
let lastMovedTo = null;


/**
 * ------------------
 * Functions
 * ------------------
 */

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
    tile.classList.add('tile');
    if (counter % 2 == 0) tile.classList.add('light');
    else tile.classList.add('dark');
    tile.id = `${file}${rank}${idTag}`;
    return tile;
}

function createBoard(board, tiles) {
    tiles.forEach(tile => board.appendChild(tile));
}

function initBoards(tiles) {
    let coordinates;
    tiles.forEach(tile => {
        coordinates = getCoordinates(tile);
        initPiece(tile, coordinates);
    });
}

function getCoordinates(tile) {
    return tile.id.slice(0, 2);
}

function initPiece(tile, coordinates) {
    let file = coordinates[0];
    let rank = coordinates[1];

    if (rank == '7') setPiece(tile, BLACK_PAWN);
    else if (rank == '2') setPiece(tile, WHITE_PAWN);
    else if (rank == '8') {
        if (file == 'a' || file == 'h') setPiece(tile, BLACK_ROOK);
        else if (file == 'b' || file == 'g') setPiece(tile, BLACK_KNIGHT);
        else if (file == 'c' || file == 'f') setPiece(tile, BLACK_BISHOP);
        else if (file == 'd') setPiece(tile, BLACK_QUEEN);
        else if (file == 'e') setPiece(tile, BLACK_KING);
    } else if (rank == '1') {
        if (file == 'a' || file == 'h') setPiece(tile, WHITE_ROOK);
        else if (file == 'b' || file == 'g') setPiece(tile, WHITE_KNIGHT);
        else if (file == 'c' || file == 'f') setPiece(tile, WHITE_BISHOP);
        else if (file == 'd') setPiece(tile, WHITE_QUEEN);
        else if (file == 'e') setPiece(tile, WHITE_KING);
    } else {
        setPiece(tile, '');
    }
}

function setPiece(tile, piece) {
    tile.setAttribute('piece', piece);
    tile.innerHTML = piece;
}

function tileClickHandler() {
    const tile = this;
    const board = tile.id[3];
    const piece = tile.getAttribute('piece');

    if (whiteTurn == true) {
        if (board == 'w') {
            if (isWhitePiece(piece)) {
                changeSelected(tile);
                start = tile;
                showValidMoves(start);
            } else if (start != null) {
                end = tile;
                if (isValidMove(start, end)) {
                    makeMove(start, end);

                    clearSelected();
                    start = null;

                    whiteTurn = false;
                    blackTurn = true;
                    display.innerHTML = 'Black, your move.';
                }
                end = null;
            }
        }
    } else if (blackTurn == true) {
        if (board == 'b') {
            if (isBlackPiece(piece)) {
                changeSelected(tile);
                start = tile;
                showValidMoves(start);
            } else if (start != null) {
                end = tile;
                if (isValidMove(start, end)) {
                    makeMove(start, end);

                    clearSelected();
                    start = null;

                    blackTurn = false;
                    whiteTurn = true;
                    display.innerHTML = 'White, your move.';
                }
                end = null;
            }
        }
    }
}

function isWhitePiece(piece) {
    return whitePieces.includes(piece);
}

function isBlackPiece(piece) {
    return blackPieces.includes(piece);
}

function changeSelected(tile) {
    if (selected != null) selected.classList.remove('selected');
    selected = tile;
    selected.classList.add('selected');
}

function clearSelected() {
    selected.classList.remove('selected');
    selected = null;
}

function showValidMoves(start) {
    // TODO: implementation
}

function isValidMove(start, end) {
    // TODO: implementation
    return true;
}

function getTiles(coordinates) {
    return document.querySelectorAll('[id^="' + coordinates + '"]');
}

function makeMove(start, end) {
    const piece = start.getAttribute('piece');
    
    const endCoordinates = getCoordinates(end);
    const startCoordinates = getCoordinates(start);

    const endTiles = getTiles(endCoordinates);
    const startTiles = getTiles(startCoordinates);

    endTiles.forEach(tile => setPiece(tile, piece));
    startTiles.forEach(tile => setPiece(tile, ''));

    highlightLastMoved(startTiles, endTiles);
}

function highlightLastMoved(startTiles, endTiles) {
    if (lastMovedFrom != null && lastMovedTo != null) {
        lastMovedFrom.forEach(tile => tile.classList.remove('highlighted'));
        lastMovedTo.forEach(tile => tile.classList.remove('highlighted'));
    }

    lastMovedFrom = startTiles;
    lastMovedTo = endTiles;

    lastMovedFrom.forEach(tile => tile.classList.add('highlighted'));
    lastMovedTo.forEach(tile => tile.classList.add('highlighted'));
}