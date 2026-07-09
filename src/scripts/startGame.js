import { handleChoice } from "./handleChoice.js";
import { nextPlayer } from "./nextPlayer.js";
import { displayPlayers } from "./displayPlayers.js";
import { highlightCurrentPlayer } from "./highlightCurrentPlayer.js";
import { state,txt,startBtn } from "./globalVars.js";
import {savePlayers} from "./savePlayers.js";

export function startGame() {
  state.savedPlayers = savePlayers();

  if (Object.keys(state.savedPlayers).length < 2) {
    txt.innerText = "Please add at least two players to start the game.";
    return;
  }

  startBtn.remove();
  txt.innerText = "Choose Truth or Dare";

  state.newBtn = document.createElement("button");
  state.newBtn.id = "next-btn";
  state.newBtn.innerText = "Next Player";
  document.body.appendChild(state.newBtn);

  state.choiceBtn1 = document.createElement("button");
  state.choiceBtn1.id = "choice-btn1";
  state.choiceBtn1.innerText = "Truth";
  document.body.appendChild(state.choiceBtn1);

  state.choiceBtn2 = document.createElement("button");
  state.choiceBtn2.id = "choice-btn2";
  state.choiceBtn2.innerText = "Dare";
  document.body.appendChild(state.choiceBtn2);

  state.newBtn.addEventListener("click", () => nextPlayer(state, txt, highlightCurrentPlayer));
  state.choiceBtn1.addEventListener("click", () => handleChoice("truth"));
  state.choiceBtn2.addEventListener("click", () => handleChoice("dare"));

  displayPlayers(state.savedPlayers);
  highlightCurrentPlayer(state);
}