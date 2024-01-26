let text = document.querySelector('.js-title');
      let currentPlayer = 'X';
      let table = [
        ['','',''],
        ['','',''],
        ['','','']
      ];
      
      let scoreX = JSON.parse(localStorage.getItem('scoreX')) || {
        wins: 0,
        losses: 0,
        ties: 0
      }
      let scoreO = JSON.parse(localStorage.getItem('scoreO')) || {
        wins: 0,
        losses: 0,
        ties: 0
      }

      displayScore();
      displayTies();
      

      function gameClick(rows, columns) {
        if (table[rows][columns] === '' && document.querySelector(`.box${rows}${columns}`).innerHTML === '') {
        document.querySelector(`.box${rows}${columns}`).innerHTML = currentPlayer;
        table[rows][columns] = currentPlayer;
        

        switchPlayer();
        }
        
        ties();
        checkForWinner();
      }
         

      function checkForWinner() {
        for (let i = 0; i < 3; i++) {
          if (
            (table[i][0] === 'X' && table[i][1] === 'X' && table[i][2] === 'X') || 
            (table[0][i] === 'X' && table[1][i] === 'X' && table[2][i] === 'X')) {
            xWins();        
            return;
          } 
          
          if (
            (table[0][0] === 'X' && table[1][1] === 'X' && table[2][2] === 'X') ||
            (table[0][2] === 'X' && table[1][1] === 'X' && table[2][0] === 'X')) {
            xWins();
            return;
          }

          if (
            (table[i][0] === 'O' && table[i][1] === 'O' && table[i][2] === 'O') || 
            (table[0][i] === 'O' && table[1][i] === 'O' && table[2][i] === 'O')) {
            oWins();         
            return;
          } 
          
          if (
            (table[0][0] === 'O' && table[1][1] === 'O' && table[2][2] === 'O') ||
            (table[0][2] === 'O' && table[1][1] === 'O' && table[2][0] === 'O')) {
            oWins();
            return;
          }

        }
      }
      function xWins() {
        scoreX.wins++;
        scoreO.losses++;
        displayScore();
        displayTies();
        whoWonTitle('X');
            
           setTimeout(() => {
            clearTable();
            text.innerHTML = '';
          }, 3000);
        currentPlayer = 'X';
        storage();
      };

      function oWins() {
        scoreO.wins++;
        scoreX.losses++;
        displayScore();
        displayTies();
        whoWonTitle('O');
        
          setTimeout(() => {
            clearTable();
            text.innerHTML = '';
          }, 3000);
        currentPlayer = 'X';
        storage();
      }

      function ties() {
        for (let rows = 0; rows < 3; rows++) {
          for (let columns = 0; columns < 3; columns++) {
            if (table[rows][columns] === '') {
              return false;
            }
          }
        }
        scoreX.ties++;
        scoreO.ties++;
        displayScore();
        displayTies();
        storage();
        whoWonTitle('Tie')

        setTimeout(() => {
          clearTable()
          text.innerHTML = '';
        }, 3000);
        currentPlayer = 'X';
        
        }
        

      

      function switchPlayer(rows, columns) {
        if (currentPlayer === 'X') {
          currentPlayer = 'O';
        } else {
          currentPlayer = 'X';
        }
      }

      function clearTable() {
        let allBox = document.querySelectorAll('.box00, .box01, .box02, .box10, .box11, .box12, .box20, .box21, .box22');

        allBox.forEach(element => {
          element.innerHTML = '';
        });
        
        table = [
        ['','',''],
        ['','',''],
        ['','','']
      ];
      currentPlayer = 'X';
    
      }

      function displayScore() {
        document.querySelector('.js-scoreX').innerHTML = `Player 1 : 'X'<br>
        Wins: ${scoreX.wins}
          Losses: ${scoreX.losses}`;
        document.querySelector('.js-scoreO').innerHTML = `Player 2 : 'O'<br>
        Wins: ${scoreO.wins}
          Losses: ${scoreO.losses}`;
      }

      function displayTies() {
        document.querySelector('.js-tie-score').innerHTML =  `Ties:${scoreX.ties}`
      }

      function storage() {
        localStorage.setItem('scoreX', JSON.stringify(scoreX));
        localStorage.setItem('scoreO', JSON.stringify(scoreO));
      }
          
      document.querySelector('.js-reset-game').addEventListener(('click'), () => {
        clearTable();
        storage();
        text.innerHTML = '';
      });
      document.querySelector('.js-reset-score').addEventListener('click', () => {
        clearTable();
        text.innerHTML = '';
        
        scoreX.wins = 0;
        scoreX.losses = 0;
        scoreX.ties = 0;

        scoreO.wins = 0;
        scoreO.losses = 0;
        scoreO.ties = 0;
        displayScore();
        displayTies();
        storage();
      })

      

      function whoWonTitle(winner) {
        let text = document.querySelector('.js-title');
        if (winner === 'X') {
          text.innerHTML = `Player 1 Wins!`;
        } else if (winner === 'O') {
          text.innerHTML = `Player 2 Wins!`;
        } else if (winner === 'Tie') {
          text.innerHTML = `Tie!`;
        } else {
          text.innerHTML = '';
        }
      }