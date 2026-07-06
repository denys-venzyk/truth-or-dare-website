import questionsTruth from "./questionsTruth.js";
import questionsDare from "./questionsDare.js";

const txt = document.getElementById("question-text");
const startBtn = document.getElementById("start-btn");
const addPlayerBtn = document.getElementById("add-player-btn");

let newBtn = null;
let choiceBtn1 = null;
let choiceBtn2 = null;

let counter1 = -1;
let counter2 = -1;
let playerCount = 1;
let savedPlayers = {};
let playerSequence = 0;
let choice = false;

function startGame() {
  savedPlayers = savePlayers(); 
  
  if (Object.keys(savedPlayers).length < 2) {
    txt.innerText = "Please add at least two players to start the game.";
    return;
  } else if (Object.values(savedPlayers).some(player => player.name.trim() === "")) {
    txt.innerText = "Please fill in all player names before starting the game.";
    return;
  }

  startBtn.remove();
  txt.innerText = "";


  newBtn = document.createElement("button");
  newBtn.id = "next-btn";
  newBtn.innerText = "Next Player";
  document.body.appendChild(newBtn);

  choiceBtn1 = document.createElement("button");
  choiceBtn1.id = "choice-btn1";
  choiceBtn1.innerText = "Truth";
  document.body.appendChild(choiceBtn1);

  choiceBtn2 = document.createElement("button");
  choiceBtn2.id = "choice-btn2";
  choiceBtn2.innerText = "Dare";
  document.body.appendChild(choiceBtn2);

  
  newBtn.addEventListener("click", nextPlayer);
  choiceBtn1.addEventListener("click", () => handleChoice("truth"));
  choiceBtn2.addEventListener("click", () => handleChoice("dare"));

  displayPlayers(savedPlayers);
  highlightCurrentPlayer();
}


function handleChoice(type) {
  if (choice === true) {
    txt.innerText = "You have already chosen. Please click 'Next' to proceed to the next player.";
    return;
  };

  const playerKeys = Object.keys(savedPlayers);
  const currentPlayerKey = playerKeys[playerSequence];
  const currentPlayer = savedPlayers[currentPlayerKey];

  let question = "";

  if (type === "truth") {
    
    if (currentPlayer.streak === 3) {
      txt.innerText = `${currentPlayer.name}, you chose Truth 3 times in a row! You MUST choose Dare!`;
      return;
    }

    if (counter1 > questionsTruth.length - 2) {
      txt.innerText = "Congrats, you answered all Truth questions!";
      return;
    }

    counter1++;
    currentPlayer.streak++;
    question = questionsTruth[counter1];

  } else if (type === "dare") {
    if (counter2 > questionsDare.length - 2) {
      txt.innerText = "Congrats, you answered all Dare questions!";
      return;
    }

    counter2++;
    currentPlayer.streak = 0;
    question = questionsDare[counter2];
  }

  txt.innerText = question;
  choice = true;
}

function nextPlayer() {
  const playerKeys = Object.keys(savedPlayers);
  if (!choice) {
    txt.innerText = "Please choose Truth or Dare before moving to the next player.";
    return;
  }
  choice = false; 
  playerSequence++;
  if (playerSequence >= playerKeys.length) {
    playerSequence = 0;
  }

  highlightCurrentPlayer();
  txt.innerText = "Choose Truth or Dare!";
}

function highlightCurrentPlayer() {
  const playerInputs = document.querySelectorAll("#player-list h1");
  playerInputs.forEach(p => p.style.color = "black");
  if (playerInputs[playerSequence]) {
    playerInputs[playerSequence].style.color = "green";
  }
}

function addPlayer() {
  if (playerCount > 1) {
    const playerNumbers = [];
    for (let i = 1; i < playerCount; i++) {
      const input = document.querySelector(".player" + i);
      if (input && input.value.trim() === "") {
        playerNumbers.push(i);
      }
    }
    if (playerNumbers.length > 0) {
      txt.innerText = `Please fill in the player №${playerNumbers} name before adding a new player.`;
      return;
    };
  };

  const container = document.createElement("div");
  container.className =`player-container-${playerCount}`; 

  const playerInput = document.createElement("input");
  const deletePlayerBtn = document.createElement("button");
  deletePlayerBtn.innerText = "Delete Player";
  deletePlayerBtn.className = "delete-player-btn";
  deletePlayerBtn.addEventListener("click", () => removePlayer(container));
  container.appendChild(deletePlayerBtn);
  playerInput.className = "player" + playerCount;
  playerInput.placeholder = "Player " + playerCount;
  container.appendChild(playerInput);
  document.querySelector(".player-inputs").appendChild(container);
  playerCount++;
}
addPlayerBtn.addEventListener("click", addPlayer);

function removePlayer(id) {
  if (playerCount > 1) {
    const num = id.className.split('-')[2];
    const playerInput = document.querySelector(`.player-container-${num}`);
    if (playerInput) {
      playerInput.remove();
      for (let i = Number(num) + 1; i < playerCount; i++) {
        
        const player = document.querySelector(`.player-container-${i}`);
        player.className = `player-container-${i - 1}`;
        const input = player.querySelector('input');
        input.className = `player${i - 1}`;
        input.placeholder = `Player ${i - 1}`;
      }
      playerCount--;
    }
  }
}
function savePlayers() {
  const playerInputs = document.querySelectorAll(".player-inputs input");
  const tempPlayers = {};
  playerInputs.forEach((input, index) => {
    tempPlayers[`player${index + 1}`] = { name: input.value, score: 0, streak: 0 };
  });
  return tempPlayers;
}

function displayPlayers(players) {
  addPlayerBtn.remove();
  
  const containers = document.querySelectorAll(".player-inputs");
  containers.forEach((input) => input.remove());

  const playerList = document.createElement("div");
  playerList.id = "player-list";
  playerList.style.display = "flex";

  for (const player in players) {
    const item = document.createElement("h1");
    item.textContent = players[player].name;
    item.style.marginRight = "20px";
    playerList.appendChild(item);
  }
  document.body.appendChild(playerList);
}

startBtn.addEventListener("click", startGame);