let blueZoneWidth = 50;
let redZoneWidth = 50;
function Game() {
    this.blueZoneWidth = blueZoneWidth;
    this.redZoneWidth = redZoneWidth;
    this.player1 = document.getElementById("player1Zone");
    this.player2 = document.getElementById("player2Zone");
    this.gameStartTimer = document.querySelectorAll(".timerContainer");
    this.gameStartScreen = document.getElementById("startScreen");
    this.gameOverScreen = document.getElementById("gameOverScreen");
    this.redWinnerAlert = document.getElementById("redWinnerAlert");
    this.blueWinnerAlert = document.getElementById("blueWinnerAlert");
    this.start = () => {
        for (let el of this.gameStartTimer) el.style.display = "flex";
        this.gameStartScreen.style.display = "none";
        setTimeout(() => {
            this.player1.classList.remove("disabled");
            this.player2.classList.remove("disabled");
            for (let el of this.gameStartTimer) el.style.display = "none";
        }, 4500);
    }
    this.gameOver = () => this.gameOverScreen.style.display = "flex";
    this.checkGameWinner = () => {
        if(this.blueZoneWidth <= 0 || this.redZoneWidth <= 0){
            this.player1.classList.add("disabled");
            this.player2.classList.add("disabled");
            setTimeout(() => {this.gameOver()}, 1000);
            if (this.blueZoneWidth <= 0) {
                this.redWinnerAlert.style.display = "flex";
            } else if (this.redZoneWidth <= 0) {
                this.blueWinnerAlert.style.display = "flex";
            };
        }
    };
    this.gameRestart = () => {
        this.blueZoneWidth = 50;
        this.redZoneWidth = 50;
        this.player1.style.width = this.blueZoneWidth + "%";
        this.player2.style.width = this.redZoneWidth + "%";
        this.gameOverScreen.style.display = "none";
        this.gameStartScreen.style.display = "flex";
        this.redWinnerAlert.style.display = "none";
        this.blueWinnerAlert.style.display = "none";
    }
    this.blueZoneGrow = () => {
        this.redZoneWidth -= 5;
        this.blueZoneWidth += 5;
        this.player1.style.width = this.blueZoneWidth + "%";
        this.player2.style.width = this.redZoneWidth + "%";
        this.checkGameWinner();
    };
    this.redZoneGrow = () => {
        this.redZoneWidth += 5;
        this.blueZoneWidth -= 5;
        this.player1.style.width = this.blueZoneWidth + "%";
        this.player2.style.width = this.redZoneWidth + "%";
        this.checkGameWinner();
    };
}
let game1 = new Game();
const player1 = document.getElementById("player1Zone");
const player2 = document.getElementById("player2Zone");
const startBtn = document.getElementById("startButton");
const restartBtn = document.getElementById("endButton");
startBtn.onclick = () => game1.start();
player1.onclick = () => {
    if (!player1.classList.contains("disabled")) {
        game1.blueZoneGrow();
    };
};
player2.onclick = () => {
    if (!player2.classList.contains("disabled")){
        game1.redZoneGrow();
    };
};
restartBtn.onclick = () => game1.gameRestart();
document.addEventListener('touchmove', function (event) {
    if (event.scale !== 1) { event.preventDefault(); }
}, false);
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
  let now = (new Date()).getTime();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);