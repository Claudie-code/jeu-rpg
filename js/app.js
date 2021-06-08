const app = {
  player: {
    x: 0,
    y: 0,
    direction: 'right',
  },
  targetCell: {
    x: 0,
    y: 0,
  },
  gameOver: false,
  deplacements: 0,
  randomRow: 0,
  randomCell: 0,
  buttonPlay: document.createElement('button'),
  createButton: () => {
    app.buttonPlay.className = 'buttonPlay';
    app.buttonPlay.textContent = 'Play';
    app.divResult.appendChild(app.buttonPlay);
    app.playOnclick();
  },
  createBuissons: () => {
    app.buissons = [
      {
      x: 0,
      y: 0,
      },
    ];
    app.buissons[0].y = app.generateRandomNumber(1, app.targetCell.y-1);
    app.buissons[0].x = app.generateRandomNumber(1, app.targetCell.x-1);
    app.buissons.push({
      x: app.buissons[0].x -1, y: app.buissons[0].y -1
    });
    app.buissons.push({
      x: app.buissons[0].x, y: app.buissons[0].y -1
    });
    app.buissons.push({
      x: app.buissons[0].x -1, y: app.buissons[0].y
    });
  },
  createTrap: () => {
    app.traps = [
      {
      x: 0,
      y: 0,
      },
    ];
    app.traps[0].y = app.generateRandomNumber(1, app.targetCell.y-1);
    app.traps[0].x = app.generateRandomNumber(1, app.targetCell.x-1);
    app.traps.push({
      x: app.generateRandomNumber(1, app.targetCell.x-1), y: app.generateRandomNumber(1, app.targetCell.y-1)
    });
  },
  createTree: () => {
    for(i = 0; i < 4; i++) {
      const tree = document.createElement('div');
      tree.classList.add('treeYellow');
      document.body.appendChild(tree);
    }
    for(i = 0; i < 4; i++) {
      const tree = document.createElement('div');
      tree.classList.add('treeRed');
      document.body.appendChild(tree);
    }
    for(i = 0; i < 4; i++) {
      const tree = document.createElement('div');
      tree.classList.add('treeRed');
      document.body.appendChild(tree);
    }

  },
  generateRandomNumber: (min, max) => {
    var randSmall = Math.random();
    var randBig = randSmall * (max - min) + min;
    var roundedNumber = Math.round(randBig);
    return roundedNumber;
  },
  divResult: document.createElement("div"),
  result: document.createElement("p"),
  replay: (text) => {
    app.gameOver = true;
    app.divResult.className = "gameOver";
    app.result.textContent = text;
    document.body.insertBefore(app.divResult,app.board);
    app.divResult.appendChild(app.result);
    app.createButton();
  },
  isFall: () => {
    app.traps.forEach(element => {
      if(app.player.x === element.x && app.player.y === element.y) {
        app.replay("Perdu!");
      }
    })
  },
  isGameOver: () => {
    if(app.player.x === app.targetCell.x && app.player.y === app.targetCell.y) {
      app.replay("Gagné!");
    }
  },
  moveForward: () => {
    if (app.gameOver) {
      return;
    }
    switch (app.player.direction) {
      case 'up':
        if(app.player.y === 0) {
          console.log("tu te prends un mur");
        } else if((app.player.y === app.buissons[3].y + 1) && ((app.player.x === app.buissons[3].x) || (app.player.x === app.buissons[0].x))) {
          console.log("tu te prends un buisson");
        } else {
          app.player.y -= 1;
        }
        break;
      case 'right':
        if(app.player.x === app.targetCell.x) {
          console.log("tu te prends un mur");
        } else if((app.player.x === app.buissons[3].x - 1) && ((app.player.y === app.buissons[3].y) || (app.player.y === app.buissons[1].y))) {
          console.log("tu te prends un buisson");
        } else {
          app.player.x += 1; 
        }
        break;
      case 'down':
        if(app.player.y === app.targetCell.y) {
          console.log("tu te prends un mur");
        } else if((app.player.y === app.buissons[1].y - 1) && ((app.player.x === app.buissons[3].x) || (app.player.x === app.buissons[2].x))) {
          console.log("tu te prends un buisson");
        } else {
          app.player.y += 1;
        }
        break;
      case 'left':
        if(app.player.x === 0) {
          console.log("tu te prends un mur");
        } else if((app.player.x === app.buissons[2].x + 1) && ((app.player.y === app.buissons[0].y) || (app.player.y === app.buissons[2].y))) {
          console.log("tu te prends un buisson");
        } else {
          app.player.x -= 1;
        }
        break;
      default:
        console.log("wrong key");
    }
    app.redrawBoard();
  },
  listenKeyboardEvents: () => {
    document.addEventListener('keydown', (e) => {
      if (app.gameOver) {
        console.log(app.gameOver);
        return;
      }
      app.deplacements++;
      switch (e.key) {
        case "ArrowDown":
          if(app.player.direction === "down") {
            app.moveForward();
          } else {
            app.player.direction = 'down';
            app.redrawBoard();
          }
          break;
        case "ArrowRight":
          if(app.player.direction === "right") {
            app.moveForward();
          } else {
            app.player.direction = 'right';
            app.redrawBoard();
          }
          break;
        case "ArrowUp":
          if(app.player.direction === "up") {
            app.moveForward();
          } else {
            app.player.direction = 'up';
            app.redrawBoard();
          }
          break;
        case "ArrowLeft":
          if(app.player.direction === "left") {
            app.moveForward();
          } else {
            app.player.direction = 'left';
            app.redrawBoard();
          }
          break;
        default:
          console.log("where?");
      }
    });
  },
  drawBoard: () => {
    console.log(app.player.x, app.player.y);
    for(let i = 0; i < app.randomRow; i++) {
      const row = document.createElement('div');
      row.className = "row";
      for(let j = 0; j < app.randomCell; j++) {
        const cell = document.createElement('div');
        cell.className = "cell";
        row.appendChild(cell);
        if(j === 0 && i === 0) {
          cell.classList.add('arrondi-top-left');
        }
        if(j === 0 && i === app.randomRow - 1) {
          cell.classList.add('arrondi-bottom-left');
        }
        if(j === app.randomCell - 1 && i === 0) {
          cell.classList.add('arrondi-top-right');
        }
        if(j === app.randomCell - 1 && i === app.randomRow - 1) {
          cell.classList.add('arrondi-bottom-right');
        }
        if(j === app.targetCell.x & i === app.targetCell.y) {
          cell.classList.add("green");
        }
        app.traps.forEach(element => {
          if(j === element.x & i === element.y) {
            cell.classList.add("trap");
          }
        })
        app.buissons.forEach(element => {
          if(j === element.x & i === element.y) {
            cell.classList.add("buisson");
          }
        });
        if(j === app.player.x & i === app.player.y) {
          const divPlayer = document.createElement('div');
          divPlayer.className = "player";
          divPlayer.classList.add(app.player.direction);
          cell.appendChild(divPlayer);
        }
      }
      app.board.appendChild(row);
    }
    app.isGameOver();
    app.isFall();
  },
  clearBoard: () => {
    app.board.innerHTML = "";
  },
  redrawBoard: () => {
    app.clearBoard();
    app.drawBoard();
  },
  playOnclick: () => {
    app.buttonPlay.onclick = () => {
      app.divResult.className = "none";
      app.setGame();
    };
  },
  setGame: () => {
    app.board = document.querySelector("#board");
    app.clearBoard();
    app.gameOver = false;
    app.player.x = 0;
    app.player.y = 0;
    app.deplacements = 0;
    app.targetCell = {};
    app.randomRow = app.generateRandomNumber(10,14);
    app.randomCell = app.generateRandomNumber(12,15);
    app.targetCell.y = app.randomRow - 1;
    app.targetCell.x = app.randomCell - 1;
    app.createTrap();
    app.createTree();
    app.createBuissons();
    app.drawBoard();
  },
  init: () => {
    app.setGame();
    app.listenKeyboardEvents();
  }
};

document.addEventListener('DOMContentLoaded', app.init);
