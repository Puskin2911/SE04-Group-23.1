import React from "react";
import Position from "../utils/Position";
import {BOARD_HEIGHT_SIZE, BOARD_WIDTH_SIZE, CELL_SIZE} from "../constants/BoardConstants";
import canvasService from "../services/CanvasService";
import gameService from "../services/GameService";

export default class Board extends React.Component {

    constructor(props) {
        super(props);

        this.room = props.room;
        this.roomId = this.room.id;
        this.user = props.user;
        this.stompClient = props.stompClient;
        this.subscription = null;

        this.canvasRef = React.createRef();

        this.state = {
            boardStatus: null,
            movingPiece: "00000",
            clickingPosition: null,
            availableMovePositions: [],
            isMyTurn: false
        }
    }

    drawBoard = () => {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvasService.clearBoard(canvas);
        canvasService.drawBlankBoard(ctx);
        canvasService.drawPieces(ctx, this.state.boardStatus, this.props.isRedPlayer);
        canvasService.drawAvailableMovePosition(ctx, this.state.availableMovePositions);
        canvasService.drawMovingPiece(ctx, this.state.clickingPosition);
    }

    handleMove = (event) => {
        if (!this.state.isMyTurn) return;

        const canvas = this.canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        console.log('x: ' + x + '\ny: ' + y);

        const position = new Position(x, y);
        const xy = position.getXY();
        console.log(xy);

        if (xy === '-1') return;

        const boardStatus = this.state.boardStatus;
        const movingPiece = this.state.movingPiece;

        // Find piece when user click on board
        let index = boardStatus.indexOf(xy);
        let color = boardStatus.charAt(index + 2);
        const piece = boardStatus.slice(index, index + 5);

        const clickingPosition = {
            centerX: xy.charAt(0),
            centerY: xy.charAt(1)
        }

        if (movingPiece === '00000') {
            if (color !== '0' && gameService.isMyPiece(color, this.props.isRedPlayer)) {
                // TODO : get available move position here;
                const availableMovePositionToSave = gameService.getAvailableMovePosition(piece, boardStatus);

                this.setState({
                    movingPiece: piece,
                    clickingPosition: clickingPosition,
                    availableMovePositions: availableMovePositionToSave
                });
            }
        } else {
            if (!gameService.isValidMove(boardStatus, movingPiece, {x: xy.charAt(0), y: xy.charAt(1)})) {
                return;
            }

            // TODO: Handle asynchronous display
            let move = movingPiece.slice(0, 2) + '_' + piece.slice(0, 2);

            // Send message to server.
            this.stompClient.send("/app/room/" + this.roomId + "/move", {}, JSON.stringify({
                roomId: this.roomId,
                move: move
            }));
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("Starting componentDidUpdate ...");
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');

        if (this.state.boardStatus !== null) {
            console.log("DRAW BOARD!!!!");
            this.drawBoard();
        }
    }

    componentDidMount() {
        console.log("Starting componentDidMount ...");

        this.subscription = this.stompClient.subscribe("/room/" + this.roomId + "/move", (payload) => {
            const gameDto = JSON.parse(payload.body);
            console.log("receive payload from Board: " + gameDto);

            const isMyTurnToUpdate = gameDto.nextTurnUsername === this.user.username;
            let clickingPositionToUpdate = {
                centerX: this.state.movingPiece.charAt(0),
                centerY: this.state.movingPiece.charAt(1)
            }

            this.setState({
                boardStatus: gameDto.boardStatus,
                isMyTurn: isMyTurnToUpdate,
                clickingPosition: clickingPositionToUpdate,
                movingPiece: '00000',
                availableMovePositions: []
            });
        });
    }

    componentWillUnmount() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    render() {
        console.log("Before rendering in Board ...");
        return (
            <div className="col-6">
                <canvas ref={this.canvasRef}
                        className="border border-success"
                        width={BOARD_WIDTH_SIZE}
                        height={BOARD_HEIGHT_SIZE}
                        onClick={this.handleMove}
                />
            </div>
        );
    }

}