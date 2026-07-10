import { right } from "./right.js";
import { left } from "./left.js";
import { savePlayer } from "./savePlayer.js";
import { state } from "./globalVars.js";

export function openWindow() {
  const myWindow = document.createElement("div");

  myWindow.className = "my-window";

  const popUp = document.createElement("div");
  popUp.className = "popUp";

  const inputMessage = document.createElement("h1");
  const playerInput = document.createElement("input");
  const saveBtn = document.createElement("button");
  const logoMessage = document.createElement("h1");
  const playerLogo = document.createElement("img");

  const logoChoice = document.createElement("div");
  const arrowLeft = document.createElement("img");
  const arrowRight = document.createElement("img");
  const logoAndSave = document.createElement("div");

  arrowLeft.src = "../public/images/left-arrow.png";
  arrowRight.src = "../public/images/right-arrow.png";

  saveBtn.innerText = "Save";
  inputMessage.innerText = "Write down your nickname";
  logoMessage.innerText = "Choose your logo";
  playerInput.id = state.playerCount;
  playerInput.className = "playerName";
  playerInput.placeholder = "Player " + state.playerCount;
  playerLogo.src = "../public/images/logo1.png";
  playerLogo.className = "player-logo";

  logoAndSave.className = "logo-and-save";

  logoChoice.appendChild(arrowLeft);
  logoChoice.appendChild(playerLogo);
  logoChoice.appendChild(arrowRight);

  popUp.appendChild(inputMessage);
  popUp.appendChild(playerInput);
  popUp.appendChild(logoMessage);
  logoAndSave.appendChild(logoChoice);
  logoAndSave.appendChild(saveBtn);

  popUp.appendChild(logoAndSave);

  myWindow.appendChild(popUp);
  document.body.appendChild(myWindow);
  saveBtn.addEventListener("click", () =>
    savePlayer(playerInput, myWindow, playerLogo, state)
  );
  arrowLeft.addEventListener("click", () => left(playerLogo, state));
  arrowRight.addEventListener("click", () => right(playerLogo, state));
}