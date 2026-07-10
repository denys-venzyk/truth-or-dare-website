import {state, txt} from "./globalVars.js";
import questionsDare from "./questionsDare.js";
import questionsTruth from "./questionsTruth.js";

export function handleChoice(type) {
  if (state.choice === true) {
    txt.innerText =
      "You have already chosen. Please click 'Next' to proceed to the next player.";
    return;
  }

  const playerKeys = Object.keys(state.savedPlayers);
  const currentPlayerKey = playerKeys[state.playerSequence];
  const currentPlayer = state.savedPlayers[currentPlayerKey];

  let question = "";

  if (type === "truth") {
    if (currentPlayer.streak === 3) {
      txt.innerText = `${currentPlayer.name}, you chose Truth 3 times in a row! You MUST choose Dare!`;
      return;
    }

    if (questionsTruth.length === 0) {
      txt.innerText = "Congrats, you answered all Truth questions!";
      return;
    }

    let randomIndex = Math.floor(Math.random() * questionsTruth.length);
    currentPlayer.streak++;
    question = questionsTruth[randomIndex];
    questionsTruth.splice(randomIndex, 1);
  } else if (type === "dare") {
    if (questionsDare.length == 0) {
      txt.innerText = "Congrats, you answered all Dare questions!";
      return;
    }

    let randomIndex = Math.floor(Math.random() * questionsDare.length);
    currentPlayer.streak = 0;
    question = questionsDare[randomIndex];
    questionsDare.splice(randomIndex, 1);
  }

  txt.innerText = question;
  state.choice = true;
}