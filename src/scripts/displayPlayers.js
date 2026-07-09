import { addPlayerBtn } from "./globalVars.js";
export function displayPlayers(players) {
  addPlayerBtn.remove();

  const containers = document.querySelectorAll(".player-inputs");
  containers.forEach((input) => input.remove());

  const playerList = document.createElement("div");
  playerList.id = "player-list";

  for (const player in players) {
    const container = document.createElement("div");
    const logo = players[player].logo;
    const item = document.createElement("h1");
    item.className = "displayed-player-name";
    container.className = "displayed-player";
    item.textContent = players[player].name;
    container.appendChild(logo);
    container.appendChild(item);

    playerList.appendChild(container);
  }
  document.body.appendChild(playerList);
}