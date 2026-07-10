import { removePlayer } from "./removePlayer.js";

export function savePlayer(player, myWindow, logo, state) {
  if (player.value.trim() === "") {
    const text = myWindow.querySelector("h1");
    text.innerText = "Write your name normally!";
    return;
  }
  myWindow.remove();
  const container = document.createElement("div");
  container.id = `player-container-${player.id}`;
  container.className = "player-container";

  const playerName = document.createElement("h2");
  const deletePlayerBtn = document.createElement("img");
  deletePlayerBtn.src = "../public/images/bin.png";
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