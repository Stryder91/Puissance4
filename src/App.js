import React from 'react';
import {Component} from 'react';
import './App.css';
import { Case } from './components/Case';
import { InitialBoard } from './components/InitialBoard';


class App extends Component {

    state = {
        firstPlayerTurn: true,
        gameOver: 0,
        board: [...InitialBoard],
        hoverIndex: null
    }
    

    componentDidUpdate () {
        if (this.state.gameOver === 1){
            this.resetBoard()
            alert('Victoire des rouges');
        } else if (this.state.gameOver === 2) {
            this.resetBoard()
            alert('Victoire des jaunes');
        }
    }

    resetBoard = () => {
        this.setState({board:[
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0]
        ], gameOver: 0});
    }

    handleHover = (x) => {
        this.setState({hoverIndex: x})
    }
    handleMouseLeave = () => {
        this.setState({hoverIndex: null})
    }

    handleClick = x => {
        const player = this.state.firstPlayerTurn;
        let myNewBoard = [...this.state.board];
        const myCol = myNewBoard[x];

        
        for (let i=myCol.length-1; i>=0; i--) {
            if (myNewBoard[x][i]===0) {
                (player)
                ? myNewBoard[x][i] = 2
                : myNewBoard[x][i] = 1
                break;
            }
        }

        // Victoire en colonne
        for (let col=0; col<myNewBoard.length-2; col++){
            for (let ln=0; ln<myNewBoard[col].length-3; ln++) {
                if (myNewBoard[col][ln] === 1 && myNewBoard[col][ln+1] === 1 && myNewBoard[col][ln+2] === 1 && myNewBoard[col][ln+3] === 1) {
                    this.setState({gameOver:1})
                } else if (myNewBoard[col][ln] === 2 && myNewBoard[col][ln+1] === 2 && myNewBoard[col][ln+2] === 2 && myNewBoard[col][ln+3] === 2){
                    this.setState({gameOver:2})
                }
            }
        }

        // Victoire en ligne
        for (let col=0; col<myNewBoard.length-2; col++){
            for (let ln=0; ln<myNewBoard[col].length-3; ln++) {
                if (myNewBoard[col][ln+2] === 1 && myNewBoard[col+1][ln+2] === 1 && myNewBoard[col+2][ln+2] === 1 && myNewBoard[col+3][ln+2] === 1) {
                    console.log("col-ln", col)
                    this.setState({gameOver:1})
                } else if (myNewBoard[col][ln+3] === 2 && myNewBoard[col+1][ln+3] === 2 && myNewBoard[col+2][ln+3] === 2 && myNewBoard[col+3][ln+3] === 2){
                    this.setState({gameOver:2})
                }
            }
        }

        // Victoire en diagonale
        for (let col=0; col<myNewBoard.length-2; col++){
            for (let ln=0; ln<myNewBoard[col].length-3; ln++) {
                if (myNewBoard[col][ln] === 1 && myNewBoard[col+1][ln+1] === 1 && myNewBoard[col+2][ln+2] === 1 && myNewBoard[col+3][ln+3] === 1) {
                    this.setState({gameOver:1})
                } else if (myNewBoard[col][ln] === 2 && myNewBoard[col+1][ln+1] === 2 && myNewBoard[col+2][ln+2] === 2 && myNewBoard[col+3][ln+3] === 2){
                    this.setState({gameOver:2})
                }
            }
        }

        // Victoire en diagonale inversé
        for (let col=0; col<myNewBoard.length-2; col++){
            for (let ln=0; ln<myNewBoard[col].length-3; ln++) {
                if (myNewBoard[col][ln] === 1 && myNewBoard[col+1][ln-1] === 1 && myNewBoard[col+2][ln-2] === 1 && myNewBoard[col+3][ln-3] === 1) {
                    this.setState({gameOver:1})
                } else if (myNewBoard[col][ln] === 2 && myNewBoard[col+1][ln-1] === 2 && myNewBoard[col+2][ln-2] === 2 && myNewBoard[col+3][ln-3] === 2){
                    this.setState({gameOver:2})
                }
            }
        }
        this.setState({board: myNewBoard, firstPlayerTurn: !player})
    }

    render() {
        const board= this.state.board;
        return (
            <div className="App">
            <header className="App-header">
            <p> Puissance 4 </p>
            <button onClick={() => this.resetBoard()}>Reset Board</button>
            <div className="board-game">
                {
                    (board)
                    ? board.map((x, idx) => <div onMouseLeave={this.handleMouseLeave} onMouseOver={()=> this.handleHover(idx)} key={idx}>{x.map((y, key) => 
                    <Case key={key} val={y} hoverIndex={this.state.hoverIndex} col={idx} action={this.handleClick}/>)}</div>)
                    : "Loading ..."
                }
            </div>
            </header>
            </div>
        );
    }
}


export default App;
