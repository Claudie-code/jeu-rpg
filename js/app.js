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
  createMob: () => {
    app.mob = [];
    app.mob.push({
      x: app.generateRandomNumber(5, app.targetCell.x-1), y: app.generateRandomNumber(1, app.targetCell.y-1)
    });
    app.moveMob();
  },
  moveMob: () => {
    app.isDeleteMob = false;

      setInterval(() => {
        if (Math.random() < 0.7) {
          if (Math.random() < 0.2) {
            app.mob[0].direction = 'right';
            app.moveForward(app.mob[0])
          } else {
            app.mob[0].direction = 'left';
            app.moveForward(app.mob[0])
          }
        } else {
          if (Math.random() < 0.5) {
            if (app.mob[0].y > 0) {
              app.mob[0].direction = 'up';
              app.moveForward(app.mob[0])
            }
          } else {
            if (app.mob[0].y < app.targetCell.y) {
              app.mob[0].direction = 'down';
              app.moveForward(app.mob[0])
            }
          }
        }
      }, 1000);


  },
  createHeart: () => {
    app.heart.className = 'heart';
    document.body.insertBefore(app.heart, app.board);
    const div1 = document.createElement('div');
    div1.className = 'heart-bg';
    const div2 = document.createElement('div');
    div2.className = 'heart-bg';
    const div3 = document.createElement('div');
    div3.className = 'heart-bg';
    app.heart.appendChild(div1);
    app.heart.appendChild(div2);
    app.heart.appendChild(div3);
  },
  createMoveButtons: () => {
    const divMoveButtons = document.createElement('div');
    const divUpButton = document.createElement('div');
    const divDownButtons = document.createElement('div');
    const divHitButton = document.createElement('div');
    const arrowUp = document.createElement('i');
    const arrowRight = document.createElement('i');
    const arrowLeft = document.createElement('i');
    const arrowDown = document.createElement('i');
    divMoveButtons.className = 'move-buttons';
    arrowUp.classList.add("arrow", "arrow-up");
    arrowDown.classList.add("arrow", "arrow-down");
    arrowRight.classList.add("arrow", "arrow-right");
    arrowLeft.classList.add("arrow", "arrow-left");
    const buttonUp = document.createElement('button');
    const buttonDown = document.createElement('button');
    const buttonRight = document.createElement('button');
    const buttonLeft = document.createElement('button');
    const buttonHit = document.createElement('button');
    buttonHit.textContent = "Attaquer (E)";
    buttonHit.style.backgroundColor = "orange";
    buttonDown.addEventListener('click', function() {
      if(app.player.direction === "down") {
        app.moveForward(app.player);
      } else {
        app.player.direction = 'down';
        app.redrawBoard();
      }
    });
    buttonUp.addEventListener('click', function() {
      if(app.player.direction === "up") {
        app.moveForward(app.player);
      } else {
        app.player.direction = 'up';
        app.redrawBoard();
      }
    });
    buttonRight.addEventListener('click', function() {
      if(app.player.direction === "right") {
        app.moveForward(app.player);
      } else {
        app.player.direction = 'right';
        app.redrawBoard();
      }
    });
    buttonLeft.addEventListener('click', function() {
      if(app.player.direction === "left") {
        app.moveForward(app.player);
      } else {
        app.player.direction = 'left';
        app.redrawBoard();
      }
    });
    buttonHit.addEventListener('click', function() {
      app.hitAction();
    });
    buttonUp.appendChild(arrowUp);
    buttonDown.appendChild(arrowDown);
    buttonRight.appendChild(arrowRight);
    buttonLeft.appendChild(arrowLeft);
    divUpButton.appendChild(buttonUp);
    divHitButton.appendChild(buttonHit);
    divMoveButtons.appendChild(divUpButton);
    divMoveButtons.appendChild(divDownButtons);
    divMoveButtons.appendChild(divHitButton);
    divDownButtons.appendChild(buttonLeft);
    divDownButtons.appendChild(buttonDown);
    divDownButtons.appendChild(buttonRight);
    document.body.appendChild(divMoveButtons);
  },
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
      x: app.generateRandomNumber(2, app.targetCell.x-1), y: app.generateRandomNumber(2, app.targetCell.y-1)
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
      if((app.player.x === element.x && app.player.y === element.y)) {
        app.replay("Perdu!");
      }
    })
  },
  isGameOver: () => {
    if(app.player.x === app.targetCell.x && app.player.y === app.targetCell.y) {
      app.replay("Gagn??!");
    }
  },
  moveForward: (mobOrPlayer) => {
    if (app.gameOver) {
      return;
    }
    switch (mobOrPlayer.direction) {
      case 'up':
        if(mobOrPlayer.y === 0) {
          console.log("tu te prends un mur");
        } else if(app.findBuissonTop(mobOrPlayer.x, mobOrPlayer.y) > -1) {
          console.log("tu te prends un buisson");
        } else {
          mobOrPlayer.y -= 1;
        }
        break;
      case 'right':
        if(mobOrPlayer.x === app.targetCell.x) {
          console.log("tu te prends un mur");
        } else if(app.findBuissonRight(mobOrPlayer.x, mobOrPlayer.y) > -1) {
          console.log("tu te prends un buisson");
        } else {
          mobOrPlayer.x += 1; 
        }
        break;
      case 'down':
        if(mobOrPlayer.y === app.targetCell.y) {
          console.log("tu te prends un mur");
        } else if(app.findBuissonBottom(mobOrPlayer.x, mobOrPlayer.y) > -1) {
          console.log("tu te prends un buisson");
        } else {
          mobOrPlayer.y += 1;
        }
        break;
      case 'left':
        if(mobOrPlayer.x === 0) {
          console.log("tu te prends un mur");
        } else if (app.findBuissonLeft(mobOrPlayer.x, mobOrPlayer.y) > -1) {
          console.log("tu te prends un buisson");
        } else {
          mobOrPlayer.x -= 1;
        }
        break;
      default:
        console.log("wrong key");
    }
    app.redrawBoard();
  },
  hitStyle: (classHit) => {
    app.span.classList.add("bar", classHit, "white");
    setTimeout(() => {app.span.classList.remove('white')}, 500);
  },
  deleteBuisson: (directionBuisson) => {
    delete app.buissons[directionBuisson];
    app.buissons = app.buissonNoEmpty();
    setTimeout(() => {
      app.redrawBoard();    
    }, 700);
  },
  findBuissonLeft: (mobOrPlayerX, mobOrPlayerY) => {
    const buissonNoEmpty = app.buissonNoEmpty();
    const result = buissonNoEmpty.findIndex( element => {
      return (((mobOrPlayerX - 1) == element.x) && (mobOrPlayerY == element.y));
    });
    return result;
  },
  findBuissonRight: (mobOrPlayerX, mobOrPlayerY) => {
    const buissonNoEmpty = app.buissonNoEmpty();
    const result = buissonNoEmpty.findIndex( element => {
      return (((mobOrPlayerX + 1) == element.x) && (mobOrPlayerY == element.y));
    });
    return result;
  },
  findBuissonBottom: (mobOrPlayerX, mobOrPlayerY) => {
    const buissonNoEmpty = app.buissonNoEmpty();
    const result = buissonNoEmpty.findIndex( element => {
      return ((mobOrPlayerX == element.x) && ((mobOrPlayerY + 1) == element.y));
    });
    return result;
  },
  findBuissonTop: (mobOrPlayerX, mobOrPlayerY) => {
    const buissonNoEmpty = app.buissonNoEmpty();
    const result = buissonNoEmpty.findIndex( element => {
      return ((mobOrPlayerX == element.x) && ((mobOrPlayerY - 1) == element.y));
    });
    return result;
  },
  buissonNoEmpty:  () => { 
    const buissonNoEmpty = app.buissons.filter(element => {
      return element != null;
    });
    return buissonNoEmpty;
  },
  hitAction: () => {
    if(app.player.direction === "left") {
      app.hitStyle("barLeft");
      if(app.findBuissonLeft(app.player.x, app.player.y) > -1) {
        app.deleteBuisson(app.findBuissonLeft(app.player.x, app.player.y));
      }
    } else if (app.player.direction === "right") {
      app.hitStyle("barRight");
      if(app.findBuissonRight(app.player.x, app.player.y) > -1) {
        app.deleteBuisson(app.findBuissonRight(app.player.x, app.player.y));
      }
    } else if (app.player.direction === "up") {
      app.hitStyle("barTop");
      if(app.findBuissonTop(app.player.x, app.player.y) > -1) {
        app.deleteBuisson(app.findBuissonTop(app.player.x, app.player.y));
      }
    } else if (app.player.direction === "down") {
      app.hitStyle("barBottom");
      if(app.findBuissonBottom(app.player.x, app.player.y) > -1) {
        app.deleteBuisson(app.findBuissonBottom(app.player.x, app.player.y));
      }
    }
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
            app.moveForward(app.player);
          } else {
            app.player.direction = 'down';
            app.redrawBoard();
          }
          break;
        case "ArrowRight":
          if(app.player.direction === "right") {
            app.moveForward(app.player);
          } else {
            app.player.direction = 'right';
            app.redrawBoard();
          }
          break;
        case "ArrowUp":
          if(app.player.direction === "up") {
            app.moveForward(app.player);
          } else {
            app.player.direction = 'up';
            app.redrawBoard();
          }
          break;
        case "ArrowLeft":
          if(app.player.direction === "left") {
            app.moveForward(app.player);
          } else {
            app.player.direction = 'left';
            app.redrawBoard();
          }
          break;
        case "e":
          app.hitAction();
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
        if(j === app.targetCell.x & i === app.targetCell.y) {
          cell.className = "cell green";
        }
        app.mob.forEach(element => {
          if(j === element.x & i === element.y) {
            const divMob = document.createElement('div');
            divMob.className = "mob";
            divMob.classList.add(app.mob[0].direction);
            cell.appendChild(divMob);
          }
        })
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
    app.heart = document.createElement('div')
    app.createHeart()
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
    app.createMob();
    app.createButton('Jouer');
    app.createMoveButtons();
    app.drawBoard();
  },
  init: () => {
    app.setGame();
    app.listenKeyboardEvents();
  }
};

document.addEventListener('DOMContentLoaded', app.init);
