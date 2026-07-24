import {state, txt} from "./globalVars.js";
import questionsDare from "./questionsDare.js";
import questionsTruth from "./questionsTruth.js";
import {timer} from "./nextPlayer.js"

let timer2 = null;
let prevText = "";
export function handleChoice(type) {
  if (timer) clearTimeout(timer);
  if (state.choice === true) {
    clearTimeout(timer2);
    if (txt.innerText !== "You have already chosen. Please click 'Next' to proceed to the next player.") {
       prevText = txt.innerText;
    }
    txt.innerText =
      "You have already chosen. Please click 'Next' to proceed to the next player.";
      timer2 = setTimeout(()=> {txt.innerText = prevText}, 2000);
    return;
  }

  const playerKeys = Object.keys(state.savedPlayers);
  const currentPlayerKey = playerKeys[state.playerSequence];
  const currentPlayer = state.savedPlayers[currentPlayerKey];

  let question = "";

  if (type === "truth") {
    if (currentPlayer.streak === 3) {
      clearTimeout(timer2);
      
      txt.innerText = `${currentPlayer.name}, you chose Truth 3 times in a row! You MUST choose Dare!`;
      timer2 = setTimeout(()=> {txt.innerText = "Choose Truth or Dare"}, 2000);
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