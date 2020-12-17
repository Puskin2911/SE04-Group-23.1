import BoardConstants from "../constants/BoardConstants";
import imagePieceMap from "../common/ImagePieceLoader";

const CELL_SIZE = BoardConstants.CELL_SIZE;

const drawBlankBoard = (ctx) => {
    console.log("start drawBlankBoard....");
    // Horizontal
    for (let i = 0; i < 10; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        ctx.moveTo(CELL_SIZE / 2 + 1, CELL_SIZE / 2 + (CELL_SIZE + 1) * i + 1);
        ctx.lineTo(CELL_SIZE * 8.5 + 8 + 1, CELL_SIZE / 2 + (CELL_SIZE + 1) * i + 1);
        ctx.stroke();
    }

    // Vertical
    for (let i = 0; i < 9; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        ctx.moveTo(CELL_SIZE / 2 + (CELL_SIZE + 1) * i + 1, CELL_SIZE / 2 + 1);
        ctx.lineTo(CELL_SIZE / 2 + (CELL_SIZE + 1) * i + 1, CELL_SIZE * 9.5 + 10);
        ctx.stroke();
    }

    // River Side
    ctx.clearRect(CELL_SIZE / 2 + 2, CELL_SIZE * 4.5 + 6, CELL_SIZE * 8, CELL_SIZE - 1);

    // General house
    ctx.beginPath();
    // Top
    ctx.moveTo(CELL_SIZE / 2 + (CELL_SIZE + 1) * 3 + 1, CELL_SIZE / 2 + 1);
    ctx.lineTo(CELL_SIZE / 2 + (CELL_SIZE + 1) * 5 + 1, CELL_SIZE / 2 + (CELL_SIZE + 1) * 2 + 1);
    ctx.moveTo(CELL_SIZE / 2 + (CELL_SIZE + 1) * 3 + 1, CELL_SIZE / 2 + (CELL_SIZE + 1) * 2 + 1);
    ctx.lineTo(CELL_SIZE / 2 + (CELL_SIZE + 1) * 5 + 1, CELL_SIZE / 2 + 1);
    // Bot
    ctx.moveTo(CELL_SIZE / 2 + (CELL_SIZE + 1) * 3 + 1, CELL_SIZE / 2 + (CELL_SIZE + 1) * 7 + 1);
    ctx.lineTo(CELL_SIZE / 2 + (CELL_SIZE + 1) * 5 + 1, CELL_SIZE / 2 + (CELL_SIZE + 1) * 9 + 1);
    ctx.moveTo(CELL_SIZE / 2 + (CELL_SIZE + 1) * 3 + 1, CELL_SIZE / 2 + (CELL_SIZE + 1) * 9 + 1);
    ctx.lineTo(CELL_SIZE / 2 + (CELL_SIZE + 1) * 5 + 1, CELL_SIZE / 2 + (CELL_SIZE + 1) * 7 + 1);
    ctx.stroke();
};

const drawPieces = (ctx, boardStatus) => {
    const piecesOnBoard = boardStatus.split("_");
    for (let [key, value] of imagePieceMap) {
        for (const piece of piecesOnBoard) {
            if (key === piece.slice(2)) {
                let x = piece.charAt(0);
                let y = piece.charAt(1);
                ctx.drawImage(value, (CELL_SIZE + 1) * y + 1, (CELL_SIZE + 1) * x + 1, CELL_SIZE, CELL_SIZE);
            }
        }
    }
};

const clearBoard = canvas => {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
};

const drawMovingPiece = (ctx, x, y) => {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'green';
    // Left Top
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + CELL_SIZE / 4);
    ctx.moveTo(x, y);
    ctx.lineTo(x + CELL_SIZE / 4, y);
    // Right Top
    ctx.moveTo(x + CELL_SIZE, y);
    ctx.lineTo(x + CELL_SIZE * 3 / 4, y);
    ctx.moveTo(x + CELL_SIZE, y);
    ctx.lineTo(x + CELL_SIZE, y + CELL_SIZE / 4);
    // Left Bot
    ctx.moveTo(x, y + CELL_SIZE);
    ctx.lineTo(x, y + CELL_SIZE * 3 / 4);
    ctx.moveTo(x, y + CELL_SIZE);
    ctx.lineTo(x + CELL_SIZE / 4, y + CELL_SIZE);
    // Right Bot
    ctx.moveTo(x + CELL_SIZE, y + CELL_SIZE);
    ctx.lineTo(x + CELL_SIZE * 3 / 4, y + CELL_SIZE);
    ctx.moveTo(x + CELL_SIZE, y + CELL_SIZE);
    ctx.lineTo(x + CELL_SIZE, y + CELL_SIZE * 3 / 4);
    ctx.stroke();
};

const canvasService = {
    drawBlankBoard,
    drawPieces,
    clearBoard,
    drawMovingPiece
};

export default canvasService;