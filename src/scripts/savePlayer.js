import { removePlayer } from "./removePlayer.js";
let timer = null;
export function savePlayer(player, myWindow, logo, state) {
  if (player.value.trim() === "") {
    clearTimeout(timer);
    const text = myWindow.querySelector("h1");
    text.innerText = "Write your name normally!";
    timer = setTimeout(()=> {text.innerText = "Write down your nickname"}, 2000);
    return;
  }
  myWindow.remove();
  const container = document.createElement("div");
  container.id = `player-container-${player.id}`;
  container.className = "player-container";

  const playerName = document.createElement("h2");
  const deletePlayerBtn = document.createElement("img");
  deletePlayerBtn.src = "images/bin.png";
  deletePlayerBtn.className = "delete-player-btn";
  deletePlayerBtn.addEventListener("click", () => removePlayer(container, state));

  playerName.id = "player" + player.id;
  playerName.className = "player-name";
  playerName.innerText = player.value;
  container.appendChild(logo);
  container.appendChild(playerName);
  container.appendChild(deletePlayerBtn);
  document.querySelector(".player-inputs").appendChild(container);
  state.playerCount++;
}