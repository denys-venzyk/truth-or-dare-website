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
  const warning = document.createElement("h4");
  const warningContainer = document.createElement("div");

  arrowLeft.src = "./images/left-arrow.webp";
  arrowRight.src = "./images/right-arrow.webp";

  saveBtn.innerText = "Save";
  inputMessage.innerText = "Write down your nickname";
  logoMessage.innerText = "Choose your logo";
  logoMessage.className = "logo-message";
  playerInput.id = state.playerCount;
  playerInput.className = "player-name-input";
  playerInput.maxLength = "13";
  playerInput.placeholder = "Player " + state.playerCount;
  playerLogo.src = "./images/logo1.webp";
  playerLogo.className = "player-logo";

  logoAndSave.className = "logo-and-save";
  warning.className = "warning";
  warningContainer.className = "warning-container";
  logoChoice.append(arrowLeft);
  logoChoice.append(playerLogo);
  logoChoice.append(arrowRight);

  warningContainer.append(warning);


  popUp.append(inputMessage);
  popUp.append(playerInput);
  popUp.append(warningContainer);
  popUp.append(logoMessage);
  logoAndSave.append(logoChoice);
  logoAndSave.append(saveBtn);

  popUp.append(logoAndSave);

  myWindow.append(popUp);
  document.body.append(myWindow);
  saveBtn.addEventListener("click", () =>
    savePlayer(playerInput, myWindow, playerLogo, state, warning)
  );
  arrowLeft.addEventListener("click", () => left(playerLogo, state));
  arrowRight.addEventListener("click", () => right(playerLogo, state));
}