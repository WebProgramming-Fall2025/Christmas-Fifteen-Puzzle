var bgMusic;
document.addEventListener("DOMContentLoaded", function () {
  var tiles;
  var started = 0;
  timerInterval = setInterval(timeFunction, 1000);

  function setBackgroundImage(imageUrl) {
    for (let i = 0; i < tiles.length - 1; i++) {
      tiles[i].style.backgroundImage = "url(" + imageUrl + ")";
      tiles[i].style.backgroundSize =
        100 * gridSize + "px " + 100 * gridSize + "px";
    }
  }
  function shuffleTiles() {
    tiles = document.getElementsByClassName("tile");
    for (let i = tiles.length - 1; i > 0; i--) {
      let firstTile = tiles[i];
      var j = Math.floor(Math.random() * (i + 1));
      let secondTile = tiles[j];
      var temp = firstTile.style.left;
      firstTile.style.left = secondTile.style.left;
      secondTile.style.left = temp;

      firstContent = firstTile.innerHTML;
      secondContent = secondTile.innerHTML;
      tempContent = firstContent;
      firstContent = secondContent;
      secondContent = tempContent;

      tempXY = firstTile.getAttribute("row");
      firstTile.setAttribute("row", secondTile.getAttribute("row"));
      secondTile.setAttribute("row", tempXY);

      tempXY = firstTile.getAttribute("column");
      firstTile.setAttribute("column", secondTile.getAttribute("column"));
      secondTile.setAttribute("column", tempXY);

      temp = firstTile.style.top;
      firstTile.style.top = secondTile.style.top;
      secondTile.style.top = temp;
    }
  }

  var puzzleContainer = document.getElementById("puzzle-container");
  var sizeSelection = document.getElementById("gridSizeSelect");
  var imageSelect = document.getElementById("imageSelect");
  var gridSize = 3;
  function setupTile(gridSize) {
    for (let i = 0; i < gridSize; i++) {
      for (let j = 1; j <= gridSize; j++) {
        textC = i * gridSize + j;
        if (textC == gridSize * gridSize) {
          let emptyTile = document.createElement("div");
          emptyTile.className = "tile empty";
          emptyTile.setAttribute("row", i + 1);
          emptyTile.setAttribute("column", j);
          puzzleContainer.appendChild(emptyTile);
        } else {
          let tile = document.createElement("div");
          tile.className = "tile";
          tile.setAttribute("row", i + 1);
          tile.setAttribute("column", j);
          tile.innerHTML = textC;
          puzzleContainer.appendChild(tile);
          tile.addEventListener("mouseenter", moveCheck);
          tile.addEventListener("mouseleave", removeHover);
          tile.addEventListener("click", moveTile);
        }
      }
    }
  }
  setupTile(gridSize);
  tiles = puzzleContainer.getElementsByTagName("div");
  imageUrl = "../assets/img/image1.jpg";
  setBackgroundImage(imageUrl);

  document
    .getElementById("imageSelect")
    .addEventListener("change", function () {
      imageUrl = this.value;
      reloadBoard();
    });

  puzzleContainer.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;
  puzzleContainer.style.gridTemplateRows = `repeat(${gridSize}, 100px)`;

  initializeGame(tiles);
  function initializeGame(tiles) {
    for (let i = 0; i < tiles.length; i++) {
      tiles[i].style.left = (i % gridSize) * 100 + "px";
      tiles[i].style.top = parseInt(i / gridSize) * 100 + "px";
      tiles[i].style.backgroundPosition =
        "-" + tiles[i].style.left + " " + "-" + tiles[i].style.top;
    }
  }
  document
    .getElementById("gridSizeSelect")
    .addEventListener("change", function () {
      gridSize = this.value;
      reloadBoard();
    });
  function reloadBoard() {
    let parent = document.getElementById("puzzle-container");
    parent.innerHTML = "";
    setupTile(gridSize);
    initializeGame(tiles);
    setBackgroundImage(imageUrl);
    parent.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;
    parent.style.gridTemplateRows = `repeat(${gridSize}, 100px)`;
    count = 0;
    timer = 0;
    countMove.textContent = count;
    timerLabel.innerHTML = timer + " s";
    started = 0;
    stopBgMusic();
  }
  document.getElementById("shuffle").onclick = function () {
    shuffleTiles();
    document.getElementById("shuffle").disabled = true;
    imageSelect.disabled = true;
    sizeSelection.disabled = true;
  };

  function moveCheck() {
    let emptyTiles = document.getElementsByClassName("empty");
    let emptyTile = emptyTiles[0];
    let columnDiff =
      this.getAttribute("column") - emptyTile.getAttribute("column");
    let rowDiff = this.getAttribute("row") - emptyTile.getAttribute("row");
    if (columnDiff == 0 && (rowDiff == -1 || rowDiff == 1)) {
      this.classList.add("moveablepiece");
    } else if (rowDiff == 0 && (columnDiff == -1 || columnDiff == 1)) {
      this.classList.add("moveablepiece");
    }
  }
  function removeHover() {
    this.classList.remove("moveablepiece");
  }
  function moveTile() {
    let emptyTiles = document.getElementsByClassName("empty");
    let emptyTile = emptyTiles[0];
    thisTile = document.getElementsByClassName("moveablepiece")[0];
    if (thisTile.classList.contains("moveablepiece")) {
      let solvedVar = 1;
      let tempStyle = thisTile.style.left;
      thisTile.style.left = emptyTile.style.left;
      emptyTile.style.left = tempStyle;
      tempStyle = thisTile.style.top;
      thisTile.style.top = emptyTile.style.top;
      emptyTile.style.top = tempStyle;
      let thisText = thisTile.innerHTML;
      let emptyText = emptyTile.innerHTML;
      let tempText = thisText;
      thisText = emptyText;
      emptyText = tempText;
      let tempPos = thisTile.getAttribute("column");
      thisTile.setAttribute("column", emptyTile.getAttribute("column"));
      emptyTile.setAttribute("column", tempPos);
      tempPos = thisTile.getAttribute("row");
      thisTile.setAttribute("row", emptyTile.getAttribute("row"));
      emptyTile.setAttribute("row", tempPos);
      var tilesStuff = Array.from(
        document.querySelectorAll(".tile:not(.empty)")
      );
      for (let i = 0; i < tilesStuff.length; i++) {
        let height = Number(tilesStuff[i].getAttribute("row"));
        let width = Number(tilesStuff[i].getAttribute("column"));
        if (
          Number(tilesStuff[i].innerHTML) !=
          (height - 1) * gridSize + width
        ) {
          solvedVar = 0;
        }
      }
      if (solvedVar == 1) {
        notifyWin();
        moveCount();
        started = 0;
        return clearInterval(timerInterval);
      }
    }
    moveCount();
  }

  const btnReset = document.getElementById("btn-reset");
  btnReset.addEventListener("click", function () {
    document.getElementById("shuffle").disabled = false;
    imageSelect.disabled = false;
    sizeSelection.disabled = false;
    if (count > highscore) {
      highscore = count;
      highmove.textContent = highscore;
    }
    document.querySelectorAll(".tile").forEach((tile) => {
      tile.style.animation = ``;
    });
    document.getElementById("game-container").style.animation = ``;
    reloadBoard();
  });
  let count = 0;
  const countMove = document.getElementById("count-move");
  function moveCount() {
    count += 1;
    countMove.textContent = count;
    if (count == 1) {
      started = 1;
      startMusic();
    }
  }
  var timerLabel = document.getElementById("timer");
  var timer = 0;
  function timeFunction() {
    if (started == 1) {
      timer++;
      timerLabel.innerHTML = timer + " s";
    }
  }
  var highscore = 0;
  const highmove = document.getElementById("high-move");
  const btnpopup = document.querySelector(".pop-up__btnBegin");
  const popup = document.querySelector(".pop-up");
  btnpopup.addEventListener("click", function () {
    popup.classList.add("hidden");
  });
});

function beginWinAnimation() {
  counter = 0;
  document.querySelectorAll(".tile").forEach((tile) => {
    tile.style.animation = `win-tile 4s forwards`;
    tile.style.animationDelay = `${counter * 55}ms`;
    counter++;
  });
  document.getElementById(
    "game-container"
  ).style.animation = `win-grid 2s infinite`;
  document.getElementById("game-container").style.animationDelay = `${
    counter * 300
  }ms`;
}

function notifyWin() {
  stopBgMusic();
  beginWinAnimation();
  document.getElementById("title").innerText = "Congrats! You won!";
  new Audio("../assets/music/musicWinner.mp3").play();
}

function startMusic() {
  let m = [
    "../assets/music/music0.mp3",
    "../assets/music/music1.mp3",
    "../assets/music/music2.mp3",
    "../assets/music/music3.mp3",
    "../assets/music/music4.mp3",
    "../assets/music/music5.mp3",
  ];
  bgMusic = new Audio(m[Math.floor(Math.random() * 5)]);
  bgMusic.loop = true;
  bgMusic.play();
}

function stopBgMusic() {
  bgMusic.pause();
}
