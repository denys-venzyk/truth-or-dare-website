//Importing truth/dare tasks
import questionsTruth from "./questionsTruth.js";
import questionsDare from "./questionsDare.js";

//global variables
const txt = document.getElementById("all-text");
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

//function which works when button "Start" is clicked
function startGame() {
  savedPlayers = savePlayers(); 
  
  if (Object.keys(savedPlayers).length < 2) {
    txt.innerText = "Please add at least two players to start the game.";
    return;
  }

  startBtn.remove();
  txt.innerText = "Choose Truth or Dare";


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

//function that chooses what type of question to display, resolves different possible issues with truth/dare buttons logic
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

//function which passes to the next player
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

//function which works in pair with nextPlayer, it makes current player green and all others black 
function highlightCurrentPlayer() {
  const playerInputs = document.querySelectorAll("#player-list h1");
  playerInputs.forEach(p => p.style.color = "black");
  if (playerInputs[playerSequence]) {
    playerInputs[playerSequence].style.color = "green";
  }
}


function openWindow() {
 const myWindow = document.createElement("div");
  
  myWindow.className = "my-window";
  myWindow.style.position = "fixed";
  myWindow.style.top = "0";
  myWindow.style.left = "0";
  myWindow.style.width = "100vw";
  myWindow.style.height = "100vh";
  myWindow.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  myWindow.style.zIndex = "9998";

  
  myWindow.style.display = "flex";
  myWindow.style.justifyContent = "center";
  myWindow.style.alignItems = "center";

  
  const popUp = document.createElement("div");
  popUp.style.width = "400px";
  popUp.style.height = "300px";
  popUp.style.backgroundColor = "white";
  popUp.style.zIndex = "9999";
  popUp.style.padding = "20px";
  popUp.style.borderRadius = "8px";
  
  popUp.style.display = "flex";
  popUp.style.justifyContent = "center";
  popUp.style.alignItems = "center";

  const inputMessage = document.createElement("h1");
  const playerInput = document.createElement("input");
  const saveBtn = document.createElement("button");

  saveBtn.innerText = "Save";
  inputMessage.innerText = "Write down your nickname"
  playerInput.id = playerCount;
  playerInput.className = "playerName";
  playerInput.placeholder = "Player " + playerCount;

  popUp.appendChild(inputMessage);
  popUp.appendChild(playerInput);
  popUp.appendChild(saveBtn);
  myWindow.appendChild(popUp);
  document.body.appendChild(myWindow);
  saveBtn.addEventListener("click", () => savePlayer(playerInput, myWindow));
}


function savePlayer(player, myWindow) {
  if (player.value.trim() === "") {
    const text = myWindow.querySelector("h1");
    text.innerText = "Write your name normally!";
    return;
  }
  myWindow.remove();
  const container = document.createElement("div");
  container.id =`player-container-${player.id}`; 
  container.className ="player-container"; 

  const playerName = document.createElement("h2");
  const deletePlayerBtn = document.createElement("button");
  deletePlayerBtn.innerText = "Delete Player";
  deletePlayerBtn.className = "delete-player-btn";
  deletePlayerBtn.addEventListener("click", () => removePlayer(container));
  container.appendChild(deletePlayerBtn);
  playerName.id = "player" +player.id;
  playerName.className = "playerName";
  playerName.innerText = player.value;
  container.appendChild(playerName);
  document.querySelector(".player-inputs").appendChild(container);
  playerCount++;
}

/**/

//function which works when "Delete Player" buttons are clicked
function removePlayer(id) {
  if (playerCount > 1) {
    const num = id.id.split('-')[2];
    const playerInput = document.querySelector(`#player-container-${num}`);
    if (playerInput) {
      playerInput.remove();
      for (let i = Number(num) + 1; i < playerCount; i++) {
        
        const player = document.querySelector(`#player-container-${i}`);
        player.id = `player-container-${i - 1}`;
        const input = player.querySelector('h2');
        input.id = `player${i - 1}`;
        input.placeholder = `Player ${i - 1}`;
      }
      playerCount--;
    }
  }
}

//function which works in the beginning of everything, it saves all players with their names and score
function savePlayers() {
  const playerInputs = document.querySelectorAll(".player-inputs h2");
  const tempPlayers = {};
  playerInputs.forEach((input, index) => {
    tempPlayers[`player${index + 1}`] = { name: input.innerText, score: 0, streak: 0 };
  });
  return tempPlayers;
}

//function which displays players' names on the screen
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
addPlayerBtn.addEventListener("click", openWindow);