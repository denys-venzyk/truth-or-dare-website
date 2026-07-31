import { removePlayer } from "./removePlayer.js";
let timer = null;
export function savePlayer(player, myWindow, logo, state, warning) {
  if (player.value.trim() === "") {
    clearTimeout(timer);
    warning.innerText = "Write your name normally!";
    timer = setTimeout(()=> {warning.innerText = ""}, 2000);
    return;
  } else if (document.querySelector(`#player${player.value}`)) {
    clearTimeout(timer);
    warning.innerText = "This name already exists, choose something else!";
    timer = setTimeout(()=> {warning.innerText = ""}, 2000);
    return;
  }
  myWindow.remove();
  

  const container = document.createElement("div");
  container.id = `player-container-${player.id}`;
  container.className = "player-container";

  const playerName = document.createElement("h2");
  const deletePlayerBtn = document.createElement("img");
  deletePlayerBtn.src = "images/bin.webp";
  deletePlayerBtn.className = "delete-player-btn";
  deletePlayerBtn.addEventListener("click", () => removePlayer(container, state));

  playerName.id = "player" + player.value;
  playerName.className = "player-name";
  playerName.innerText = player.value;
  container.append(logo);
  container.append(playerName);
  container.append(deletePlayerBtn);
  document.querySelector(".player-inputs").append(container);
  state.playerCount++;
}