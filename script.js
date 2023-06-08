const gameboard = (() => {
    let board = ["","X","","X","O","","","",""];
    let numberBoard = [];
    const fillNumberBoard = ()=>{
        board.forEach((element,index)=>{
            if(element===""){
                numberBoard[index]=index;
            }else{
                numberBoard[index]=board[index];
            }
        });
        return numberBoard
    }
    
    const played = (symbol,index) =>{
        board[index] = symbol;
    };
    return { board,played,fillNumberBoard};
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
                const players = document.getElementById("players");
                const playersText= document.querySelector(".playersText");
                if( !playersText.textContent.includes("won")){
                    playersText.textContent = this.player.name + `(${this.player.symbol})` + " won!!!";
                    players.style.display = "flex";
                    if(this.player === player1){
                        this.player=player2;
                    }else if(this.player === player2){
                        this.player=player1;
                    }
                    render();
                }

                //const startGame = document.getElementById("start");
                //startGame.style.display = "block";
                //reset
            }else if(result === 2){
                const players = document.getElementById("players");
                const playersText= document.querySelector(".playersText");
                if( !playersText.textContent.includes("won")){
                    playersText.textContent ="Its a tie";
                    players.style.display = "flex";
                    if(this.player === player1){
                        this.player=player2;
                    }else if(this.player === player2){
                        this.player=player1;
                    }
                    render();
                }
            }else{
                if(this.player === player1){
                    this.player=player2;
                    if(this.player.name.includes("Computer")){
                        //turn(minimax(gameboard.board,this.player.symbol,player1.symbol).index);
                    }
                }else if(this.player === player2){
                    this.player=player1;
                    if(this.player.name.includes("Computer")){
                        //turn(minimax(gameboard.board,this.player.symbol,player2.symbol).index);
                    }
                }

                
                render();
            }
            
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
    const reset = ()=>{
        const players = document.getElementById("players");
        players.style.display = "none";
        
        const startGame = document.getElementById("start");
        startGame.style.display = "flex";
        const squares = document.querySelectorAll(".square");
        squares.forEach((square,index)=> {
            square.style.display="none";
            gameboard.board[index]="";
            square.textContent = gameboard.board[index];
        });
    }
    const start = (e) =>{
        e.preventDefault();
        const name1 =document.getElementById("player1");
        const name2 =document.getElementById("player2");
        const players = document.getElementById("players");
        const playersText= document.querySelector(".playersText");

        
        const computerX=document.getElementById("computerX");
        const computerO =document.getElementById("computerO");
        if(computerX.checked){
            player1 = playerFactory(name1.value + " Computer", "X");
            player2 = playerFactory(name2.value, "O");
        }else if(computerO.checked){
            player1 = playerFactory(name1.value, "X");
            player2 = playerFactory(name2.value + " Computer", "O");
        }else{
            player1 = playerFactory(name1.value, "X");
            player2 = playerFactory(name2.value, "O");
        }
        playersText.textContent = `Player X (${player1.name}) VS Player O (${player2.name}) `;
        players.style.display = "flex";
        

        this.player=player1;
        const startGame = document.getElementById("start");
        startGame.style.display = "none";
        startGame.reset();
        const squares = document.querySelectorAll(".square");
        squares.forEach((square,index)=> {
            square.style.display="flex";
            square.addEventListener("click", () => {
                turn(index);
            });
            square.textContent = gameboard.board[index];
        });
        if(player1.name.includes("Computer")){          //edw emeinaaaaa
            let bestSPot = minimax(gameboard.fillNumberBoard(),this.player.symbol,player2.symbol);
            console.log(bestSPot.index);
            turn(bestSPot.index);
        }
        
    };

    return { start,turn,reset };
})();

//displayController.start();
function emptyIndex(board){
  return  board.filter(index => index === "");
};
function winning(board, player){
 if (
 (board[0] == player && board[1] == player && board[2] == player) ||
 (board[3] == player && board[4] == player && board[5] == player) ||
 (board[6] == player && board[7] == player && board[8] == player) ||
 (board[0] == player && board[3] == player && board[6] == player) ||
 (board[1] == player && board[4] == player && board[7] == player) ||
 (board[2] == player && board[5] == player && board[8] == player) ||
 (board[0] == player && board[4] == player && board[8] == player) ||
 (board[2] == player && board[4] == player && board[6] == player)
 ) {
    return true;
 } else {
    return false;
 }
}
function minimax(board,player,human){
    var availableSpots = emptyIndex(board);
    
    if (winning(board, human)){
        return {score:-10};
    }else if (winning(board, this.player.symbol)){
        return {score:10};
	}else if (availableSpots.length === 0){
  	    return {score:0};
    }
    var moves = [];
    for (let i = 0; i < availableSpots.length; i++){
        var move = {};
  	    move.index = board[availableSpots[i]];
        board[availableSpots[i]] = player;
        if (player == this.player.symbol){
            var result = minimax(board, human,human);
            move.score = result.score;
        }
        else{
            var result = minimax(board, this.player.symbol,human);
            move.score = result.score;
        }

        board[availableSpots[i]] = move.index;

        moves.push(move);
    }
  var bestMove;
  if(player === this.player.symbol){
    var bestScore = -10000;
    for(let i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }else{

// else loop over the moves and choose the move with the lowest score
    var bestScore = 10000;
    for(let i = 0; i < moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

// return the chosen move (object) from the moves array
  return moves[bestMove];
};

const startGame = document.getElementById("start");
startGame.addEventListener("submit", displayController.start,false);
//console.log(gameboard.board);
//console.log(gameboard);
console.log(gameboard.fillNumberBoard());