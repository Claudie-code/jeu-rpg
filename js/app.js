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
  buttonReplay: document.createElement('button'),
  createButton: (text, show) => {
    app.buttonReplay.className = 'buttonPlay';
    app.buttonReplay.textContent = text;
    if (show) {
      app.divResult.appendChild(app.buttonReplay);
    } else {
      document.body.appendChild(app.buttonReplay);
      app.buttonReplay.classList.add('buttonPlayCenter');
    }

    app.playOnclick();
  },
  createBuissons: () => {
    app.buissons = [];
    let buissonOrigin = 0;
    for(i = 0;i < 4;i++) {
    app.buissons.push({
      x: app.generateRandomNumber(1, app.targetCell.x-1), y: app.generateRandomNumber(1, app.targetCell.y-1)
    });
    app.buissons.push({
      x: app.buissons[buissonOrigin].x -1, y: app.buissons[buissonOrigin].y -1
    });
    app.buissons.push({
      x: app.buissons[buissonOrigin].x, y: app.buissons[buissonOrigin].y -1
    });
    app.buissons.push({
      x: app.buissons[buissonOrigin].x -1, y: app.buissons[buissonOrigin].y
    });
    buissonOrigin += 4;
    }
  },
  createTrap: () => {
    app.traps = [];
    for(i = 0;i < 8;i++) {
      app.traps.push({
        x: app.generateRandomNumber(1, app.targetCell.x-1), y: app.generateRandomNumber(1, app.targetCell.y-1)
      });
    }
  },
  createTree: () => {
    for(i = 0; i < 5; i++) {
      const tree = document.createElement('div');
      tree.classList.add('tree','treeYellow');
      document.body.appendChild(tree);
    }
    document.querySelectorAll( '.treeYellow' )[1].style.left = "70%";
    document.querySelectorAll( '.treeYellow' )[1].style.top = "70%";
    document.querySelectorAll( '.treeYellow' )[2].style.left = "67%";
    document.querySelectorAll( '.treeYellow' )[2].style.top = "-2%";
    document.querySelectorAll( '.treeYellow' )[3].style.left = "20%";
    document.querySelectorAll( '.treeYellow' )[3].style.top = "75%";
    document.querySelectorAll( '.treeYellow' )[4].style.left = "87%";
    document.querySelectorAll( '.treeYellow' )[4].style.top = "23%";
    for(i = 0; i < 4; i++) {
      const tree = document.createElement('div');
      tree.classList.add('tree', 'treeRed');
      document.body.appendChild(tree);
    }
    document.querySelectorAll( '.treeRed' )[1].style.left = "80%";
    document.querySelectorAll( '.treeRed' )[1].style.top = "60%";
    document.querySelectorAll( '.treeRed' )[2].style.left = "70%";
    document.querySelectorAll( '.treeRed' )[2].style.top = "25%";
    document.querySelectorAll( '.treeRed' )[3].style.left = "23%";
    document.querySelectorAll( '.treeRed' )[3].style.top = "0";
    for(i = 0; i < 5; i++) {
      const tree = document.createElement('div');
      tree.classList.add('tree', 'treeGreen');
      document.body.appendChild(tree);
    }
    document.querySelectorAll( '.treeGreen' )[1].style.left = "7%";
    document.querySelectorAll( '.treeGreen' )[1].style.top = "10%";
    document.querySelectorAll( '.treeGreen' )[2].style.left = "79%";
    document.querySelectorAll( '.treeGreen' )[2].style.top = "37%";
    document.querySelectorAll( '.treeGreen' )[3].style.left = "18%";
    document.querySelectorAll( '.treeGreen' )[3].style.top = "42%";
    document.querySelectorAll( '.treeGreen' )[4].style.left = "5%";
    document.querySelectorAll( '.treeGreen' )[4].style.top = "35%";
  },
  createFLower: () => {
    app.flowers = [];
    for(i = 0;i < 8;i++) {
      app.flowers.push({
        x: app.generateRandomNumber(1, app.targetCell.x-1), y: app.generateRandomNumber(1, app.targetCell.y-1)
      });
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
    app.createButton('Rejouer', 1);
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
        } else if((app.player.y === app.buissons[3+4].y + 1) && ((app.player.x === app.buissons[3+4].x) || (app.player.x === app.buissons[0+4].x))) {
          console.log("tu te prends un buisson");
        } else if((app.player.y === app.buissons[3+8].y + 1) && ((app.player.x === app.buissons[3+8].x) || (app.player.x === app.buissons[0+8].x))) {
          console.log("tu te prends un buisson");
        } else if((app.player.y === app.buissons[3+12].y + 1) && ((app.player.x === app.buissons[3+12].x) || (app.player.x === app.buissons[0+12].x))) {
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
        } else if((app.player.x === app.buissons[3+4].x - 1) && ((app.player.y === app.buissons[3+4].y) || (app.player.y === app.buissons[1+4].y))) {
          console.log("tu te prends un buisson");
        } else if((app.player.x === app.buissons[3+8].x - 1) && ((app.player.y === app.buissons[3+8].y) || (app.player.y === app.buissons[1+8].y))) {
          console.log("tu te prends un buisson");
        } else if((app.player.x === app.buissons[3+12].x - 1) && ((app.player.y === app.buissons[3+12].y) || (app.player.y === app.buissons[1+12].y))) {
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
        } else if((app.player.y === app.buissons[1+4].y - 1) && ((app.player.x === app.buissons[3+4].x) || (app.player.x === app.buissons[2+4].x))) {
          console.log("tu te prends un buisson");
        } else if((app.player.y === app.buissons[1+8].y - 1) && ((app.player.x === app.buissons[3+8].x) || (app.player.x === app.buissons[2+8].x))) {
          console.log("tu te prends un buisson");
        } else if((app.player.y === app.buissons[1+12].y - 1) && ((app.player.x === app.buissons[3+12].x) || (app.player.x === app.buissons[2+12].x))) {
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
        } else if((app.player.x === app.buissons[2+4].x + 1) && ((app.player.y === app.buissons[0+4].y) || (app.player.y === app.buissons[2+4].y))) {
          console.log("tu te prends un buisson");
        } else if((app.player.x === app.buissons[2+8].x + 1) && ((app.player.y === app.buissons[0+8].y) || (app.player.y === app.buissons[2+8].y))) {
          console.log("tu te prends un buisson");
        } else if((app.player.x === app.buissons[2+12].x + 1) && ((app.player.y === app.buissons[0+12].y) || (app.player.y === app.buissons[2+12].y))) {
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
  hitTop: () => {
    app.span.className = "bar barTop white";
    setTimeout(() => {app.span.classList.remove('white')}, 2000)
  },
  hitBottom: () => {
    app.span.className = "bar barBottom white";
    setTimeout(() => {app.span.classList.remove('white')}, 2000)
  },
  hitLeft: () => {
    app.span.className = "bar barLeft white";
    setTimeout(() => {app.span.classList.remove('white')}, 2000)
  },
  hitRight: () => {
    app.span.className = "bar barRight white";
    setTimeout(() => {app.span.classList.remove('white')}, 2000)
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
        case "e":
          if(app.player.direction === "left") {
            if((app.player.x === app.buissons[2].x + 1) && ((app.player.y === app.buissons[0].y) || (app.player.y === app.buissons[2].y))) {
              app.hitLeft();
              delete 
            } else if((app.player.x === app.buissons[2+4].x + 1) && ((app.player.y === app.buissons[0+4].y) || (app.player.y === app.buissons[2+4].y))) {
              app.hitLeft();
            } else if((app.player.x === app.buissons[2+8].x + 1) && ((app.player.y === app.buissons[0+8].y) || (app.player.y === app.buissons[2+8].y))) {
              app.hitLeft();
            } else if((app.player.x === app.buissons[2+12].x + 1) && ((app.player.y === app.buissons[0+12].y) || (app.player.y === app.buissons[2+12].y))) {
              app.hitLeft();
            } else {
              app.hitLeft();            
            }
          } else if (app.player.direction === "right") {
            app.hitRight();
          } else if (app.player.direction === "up") {
            app.hitTop();
          } else if (app.player.direction === "down") {
            app.hitBottom();
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
          cell.className = "cell green";
        }
        app.traps.forEach(element => {
          if(j === element.x & i === element.y) {
            cell.className = "cell trap";
          }
        })
        app.flowers.forEach(element => {
          if(j === element.x & i === element.y) {
            cell.className = "cell flower";
          }
        })
        app.buissons.forEach(element => {
          if(j === element.x & i === element.y) {
            cell.className = "cell buisson";
          }
        });
        if(j === app.player.x & i === app.player.y) {
          const divPlayer = document.createElement('div');
          divPlayer.className = "player";
          divPlayer.classList.add(app.player.direction);
          cell.appendChild(divPlayer);
          divPlayer.classList.add('hit');
          app.span = document.createElement('span');
          divPlayer.appendChild(app.span);
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
    app.buttonReplay.onclick = () => {
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
    app.randomRow = app.generateRandomNumber(7,13);
    app.randomCell = app.generateRandomNumber(17,17);
    app.targetCell.y = app.randomRow - 1;
    app.targetCell.x = app.randomCell - 1;
    app.createTrap();
    app.createTree();
    app.createBuissons();
    app.createFLower();
    app.createButton('Jouer');
    app.drawBoard();
  },
  init: () => {
    app.setGame();
    app.listenKeyboardEvents();
  }
};

document.addEventListener('DOMContentLoaded', app.init);
