import questionsTruth from "./questionsTruth.js";
import questionsDare from "./questionsDare.js";

const txt = document.getElementById("question-text");
const startBtn = document.getElementById("start-btn");
const addPlayerBtn = document.getElementById("add-player-btn");
const deletePlayerBtn = document.getElementById("delete-player-btn");

let newBtn = document.getElementById("next-btn");
let choiceBtn1 = document.getElementById("choice-btn1");
let choiceBtn2 = document.getElementById("choice-btn2");
let counter1 = -1;
let counter2 = -1;
let playerCount = 1;
let savedPlayers = {};
let playerSequence = 1;

function startGame() {
  const savedPlayers = savePlayers();
  if (Object.keys(savedPlayers).length < 2) {
    txt.innerText = "Please add at least two players to start the game.";
    return;
  } else if (Object.values(savedPlayers).some(player => player.name.trim() === "")) {
    txt.innerText = "Please fill in all player names before starting the game.";
    return;
  }
  console.log("savedPlayers: ", savedPlayers);
  startBtn.remove();
  txt.innerText = "";

  newBtn = document.createElement("button");
  newBtn.id = "next-btn";
  document.body.appendChild(newBtn);

  choiceBtn1 = document.createElement("input");
  choiceBtn2 = document.createElement("input");
  choiceBtn1.type = "radio";
  choiceBtn1.id = "choice-btn1";
  choiceBtn1.name = "yes/no";
  choiceBtn1.value = "Truth";

  choiceBtn2.type = "radio";
  choiceBtn2.id = "choice-btn2";
  choiceBtn2.name = "yes/no";
  document.body.appendChild(choiceBtn1);
  
  const label1 = document.createElement("label1");
  const label2 = document.createElement("label2");
  label1.htmlFor = "choice-btn1";
  label1.textContent = "Truth";

  label2.htmlFor = "choice-btn2";
  label2.textContent = "Dare";
  document.body.appendChild(label1);
  document.body.appendChild(choiceBtn2);
  document.body.appendChild(label2);
  newBtn.innerText = "Next";
  newBtn.addEventListener("click", next);
  displayPlayers(savedPlayers);
}

function next() {
  let question = "";
  const playerInputs = document.querySelectorAll("#player-list h1");
  
  if (playerInputs.length === 0) return;

 
  let currentIndex = playerSequence - 1;
  if (currentIndex >= playerInputs.length || currentIndex < 0) {
    currentIndex = 0;
    playerSequence = 1;
  }

  const currentPlayerKey = `player${currentIndex + 1}`;

 
  if (savedPlayers[currentPlayerKey + "_streak"] === undefined) {
    savedPlayers[currentPlayerKey + "_streak"] = 0;
  }


  if (choiceBtn1.checked) {
    
    if (savedPlayers[currentPlayerKey + "_streak"] === 3) {
      txt.innerText = `${playerInputs[currentIndex].textContent}, you chose Truth 3 times in a row! You MUST choose Dare!`;
      choiceBtn1.checked = false; 
      return; 
    }

    choiceBtn1.checked = false;

    if (counter1 > questionsTruth.length - 2) {
      txt.innerText = "Congrats, you answered all questions";
      return;
    }
    
    counter1++;
    savedPlayers[currentPlayerKey + "_streak"]++;
    question = questionsTruth[counter1];

  } else if (choiceBtn2.checked) {
    choiceBtn2.checked = false;

   
    if (counter2 > questionsDare.length - 2) { 
      txt.innerText = "Congrats, you answered all questions";
      return;
    }
    
    counter2++;
    savedPlayers[currentPlayerKey + "_streak"] = 0; 
    question = questionsDare[counter2];

  } else {
    txt.innerText = "Choose something first!";
    return;
  }

  txt.innerText = question;


  playerInputs.forEach(p => p.style.color = "black");
  playerInputs[currentIndex].style.color = "green";

  playerSequence++;
  if (playerSequence > playerInputs.length) {
    playerSequence = 1;
  }
}
startBtn.addEventListener("click", startGame);

function addPlayer() {
  if (playerCount > 1 && document.querySelector(".player" + (playerCount - 1)).value.trim() === "") {
    txt.innerText = `Please fill in the player №${playerCount - 1} name before adding a new player.`;
    return;
  }
  const playerInput = document.createElement("input");
  playerInput.className = "player" + playerCount;
  playerInput.placeholder = "Player " + playerCount;
  document.querySelector(".player-inputs").appendChild(playerInput);
  playerCount++;

}
addPlayerBtn.addEventListener("click", addPlayer);

function removePlayer() {
  const playerInput = document.querySelector(".player" + (playerCount - 1));
  if (playerInput) {
    playerInput.remove();
    playerCount--;
  }
}


deletePlayerBtn.addEventListener("click", removePlayer);


function savePlayers() {
const playerInputs = document.querySelectorAll(".player-inputs input");
playerInputs.forEach((input, index) => {
  savedPlayers[`player${index + 1}`] = { name: input.value, score: 0 };
});

return savedPlayers;
}
function displayPlayers(savedPlayers) {
  addPlayerBtn.remove();
  deletePlayerBtn.remove();
  const playerInputs = document.querySelectorAll(".player-inputs");
  playerInputs.forEach((input) => input.remove());


  const playerList = document.createElement("div");
  playerList.id = "player-list";
  playerList.style.display = "flex";

  for (const player in savedPlayers) {
    const item = document.createElement("h1");
    item.textContent = savedPlayers[player].name;
    item.style.marginRight = "20px";
    playerList.appendChild(item);
  }
  document.body.appendChild(playerList);
}