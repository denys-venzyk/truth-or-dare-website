export let timer = null;

export function nextPlayer(state, txt, highlightCurrentPlayer) {
  const playerKeys = Object.keys(state.savedPlayers);
  if (!state.choice) {
    clearTimeout(timer);
    txt.innerText =
      "Please choose Truth or Dare before moving to the next player.";
      timer = setTimeout(()=> {txt.innerText = "Choose Truth or Dare"}, 2000);
    return;
  }
  state.choice = false;
  state.playerSequence++;
  if (state.playerSequence >= playerKeys.length) {
    state.playerSequence = 0;
  }

  highlightCurrentPlayer(state);
  txt.innerText = "Choose Truth or Dare!";
}