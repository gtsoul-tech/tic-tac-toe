const gameboard = (() => {
    const board = ["","","","","","","","",""];
    const played = (symbol,index) =>{
        board[index] = symbol;
    };

    return { board,played };
})();

const playerFactory = (name,symbol) => {
    return {name, symbol};
};
//console.log(player1,player2);

const displayController = (()=> {
    let player1,player2;
    const render = () => {
        const squares = document.querySelectorAll(".square");
        squares.forEach((square,index)=> {
            square.textContent = gameboard.board[index];
        });
    };
    const turn = (index) => {

        if(gameboard.board[index] == ""){
            gameboard.played(this.player.symbol,index);

            let result =check();
            if(result === 1){
                console.log(this.player);
                const players = document.getElementById("players");
                const playersText= document.querySelector(".playersText");
                playersText.textContent = this.player.name + " won!!!";
                players.style.display = "flex";

                const startGame = document.getElementById("start");
                startGame.style.display = "block";
                //reset
            }
            //based on the result show the winner for 5 sec and then restart button
            if(this.player === player1){
                this.player=player2;
            }else if(this.player === player2){
                this.player=player1;
            }
            render();
        }
    };
    //1 win //2 tie
    const check = ()=>{

        for(let i=0;i<=6;i=i+3){
            if(gameboard.board[i] === gameboard.board[i+1] && gameboard.board[i+1] === gameboard.board[i+2] && gameboard.board[i] != ""){
                return 1;
            }
        }
        for(let i=0;i<=2;i=i+1){
            if(gameboard.board[i] === gameboard.board[i+3] && gameboard.board[i+3] === gameboard.board[i+6] && gameboard.board[i] != ""){ // 0 1 2
                return 1;                                                                               // 3 4 5
                                                                                                              // 6 7 8
            }
        }
        if(gameboard.board[0] === gameboard.board[4] && gameboard.board[4] === gameboard.board[8] && gameboard.board[0] != ""){
            return 1;
        }
        if(gameboard.board[2] === gameboard.board[4] && gameboard.board[4] === gameboard.board[6] && gameboard.board[2] != ""){
            return 1;
        }
        if(gameboard.board.join("").length === 9){
            return 2;
        }
        return "Continue";
    };

    const start = (e) =>{
        e.preventDefault();
        //pare to form eksafaniseto kai reset
        
        const name1 =document.getElementById("player1");
        const name2 =document.getElementById("player2");
        const players = document.getElementById("players");
        const playersText= document.querySelector(".playersText");
        playersText.textContent = `Player X (${name1.value}) VS Player O (${name2.value}) `;
        players.style.display = "flex";
        
        const startGame = document.getElementById("start");
        startGame.style.display = "none";
        player1 = playerFactory(name1.value, "X");
        player2 = playerFactory(name2.value, "O");
        this.player=player1;
        startGame.reset();
        const squares = document.querySelectorAll(".square");
        squares.forEach((square,index)=> {
            square.addEventListener("click", () => {
                turn(index);
            });
            square.textContent = gameboard.board[index];
        });
    };

    return { start,turn };
})();
//displayController.start();

const startGame = document.getElementById("start");
startGame.addEventListener("submit", displayController.start,false);
//console.log(gameboard.board);
//console.log(gameboard);