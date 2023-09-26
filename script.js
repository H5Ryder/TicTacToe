//Game Logic

const GameBoard = () => {
  let board = [
    [, , ,],
    [, , ,],
    [, , ,],
  ];

  const add = (token, row, column) => {
    if (board[row][column] === undefined) {
      board[row][column] = token;
      console.log("Valid Move");
      return true;
    } else {
      console.log("Invalid Move");
      return false;
    }
  };

  const brd = (row, column) => {
    let val = "_";
    if (board[row][column] == "x" || board[row][column] == "o") {
      val = board[row][column];
    }
    return val;
  };

  const log = () => {
    const print = `|${brd(0, 0)} ${brd(0, 1)} ${brd(0, 2)}|\n|${brd(
      1,
      0
    )} ${brd(1, 1)} ${brd(1, 2)}|\n|${brd(2, 0)} ${brd(2, 1)} ${brd(2, 2)}|`;
    console.log(print);
  };

  const reset = () => {
    board = [
      [, , ,],
      [, , ,],
      [, , ,],
    ];
  };

  const pattern = (symbol) => {
    let counter = 0;

    //check vertical
    for (let i = 0; i <= 2; i++) {
      counter = 0;
      for (let j = 0; j <= 2; j++) {
        if (board[j][i] == symbol) {
          counter += 1;
        }
      }

      if (counter == 3) {
        return true;
      }
      counter = 0;
    }

    //check horizontal
    for (let i = 0; i <= 2; i++) {
      counter = 0;
      for (let j = 0; j <= 2; j++) {
        if (board[i][j] == symbol) {
          counter += 1;
        }
      }

      if (counter == 3) {
        return true;
      }
      counter = 0;
    }

    //diagonals
    if (
      board[0][0] == symbol &&
      board[1][1] == symbol &&
      board[2][2] == symbol
    ) {
      return true;
    }

    if (
      board[0][2] == symbol &&
      board[1][1] == symbol &&
      board[2][0] == symbol
    ) {
      return true;
    }

    return false;
  };

  const returnCellVall = (row, col) => {
    return board[row][col];
  };

  const isBoardFull = () => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === undefined) {
          return false;
        }
      }
    }
    return true;
  };



  return {
    add,
    log,
    reset,
    pattern,
    returnCellVall,
    isBoardFull,
  };
};

const GameController = (playerName, opponentName) => {
  const board = GameBoard();

  const players = [
    {
      name: playerName,
      token: "x",
    },
    {
      name: opponentName,
      token: "o",
    },
  ];

  let activePlayer = players[0];

 

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const playerSwapTokens = () => {

        let interim = players[0].token;

        players[0].token = players[1].token;
        players[1].token = interim;



   


  };


  const getActivePlayer = () => activePlayer;

  const winner = () => {
    return board.pattern(activePlayer.token);
  };

  const draw = () => {
    return board.isBoardFull();
  };

  const playRound = (row, col) => {
    console.log(`${activePlayer.name} marks at ${row},${col}`);
    let validityCheck = board.add(activePlayer.token, row, col);

    if (validityCheck) {
      console.log(`${activePlayer.name} marks at ${row},${col} was valid`);
      if (winner()) {
        console.log(`${activePlayer.name} is the Winner!`);
      } else if (draw()) {
        console.log(`Draw!`);

      } else {
        switchPlayerTurn();
        printNewRound();
      }
    } else {
      console.log(
        `${activePlayer.name} marks at ${row},${col} was invalid...try again`
      );
      //call to player to try again
    }
  };

  const printNewRound = () => {
    board.log();
    console.log(`${activePlayer.name} turn`);
  };

  const returnCellValue = (row, col) => {
    return board.returnCellVall(row, col);
  };

  const restart = () => {
    board.reset();
    activePlayer = players[0];
    printNewRound();

  };

  printNewRound();


  return {
    playRound,
    returnCellValue,
    getActivePlayer,
    winner,
    draw,
    restart,
    playerSwapTokens,
    switchPlayerTurn,
  };
};

function ScreenController() {

  

//Instance of Game Class
const game = GameController("Human", "Robot");

//Reset
const resetButton = document.querySelector(".reset");

//Conditions
let freezeGame = false;


//Changing Player



//Game Mode Select Button Stuff
const productButtons = document.querySelectorAll(".button");

console.log(productButtons);

productButtons.forEach((productButton) => {
  productButton.addEventListener("click", (e) => {
    let button = e.currentTarget;



    game.restart();
    updateDisplay();
    freezeGame = false;

    if (!button.classList.contains("selected")) {
        game.playerSwapTokens();
        game.switchPlayerTurn();
        

    }
    


   

    productButtons.forEach(
        (btn) => btn.classList.remove("selected")
      );

    button.classList.toggle("selected");



    


  });
});



//Game End Elements
const modal = document.querySelector("#modal");
  const winnerElement = document.querySelector('.winner');
  const winSymbol = document.querySelector('p.sign-text.sign');
  var drawElement = document.querySelector('.winner.draw');

  modal.addEventListener("click", () => {
    winnerElement.classList.add("hide"); 
    winSymbol.classList.add("hide");
    drawElement.classList.add("hide");
    modal.close();
  });



 
  
  const displayWinOrDraw = (win,draw) => {
   
    if (win) {
        modal.showModal();
        winnerElement.classList.remove("hide"); 
        winSymbol.classList.remove("hide");    
        winSymbol.textContent = game.getActivePlayer().token;    
        freezeGame = true;




      
    } else if (draw) {
        modal.showModal();
        drawElement.classList.remove("hide");   
        freezeGame = true; 


       
    } 


    
    




   

   
  };

  resetButton.addEventListener("click", () => {
    game.restart();
    updateDisplay();

    
    freezeGame = false;
  });

  const updateDisplay = () => {
    const buttons = document.querySelectorAll(".grid button");

    buttons.forEach((button) => {
      let row = Number(button.dataset.id);
      let column = Number(button.dataset.size);

      button.textContent = game.returnCellValue(row, column);
    });
  };




  const setGrid = () => {
    const buttons = document.querySelectorAll(".grid button");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        let row = Number(button.dataset.id);
        let column = Number(button.dataset.size);

        if (freezeGame) {
        } else {
            game.playRound(row, column);
            displayWinOrDraw(game.winner(), game.draw());
            updateDisplay();
        }



      });
    });
  };

  setGrid();

}

ScreenController();
