
export function nextPlayer(state, txt, highlightCurrentPlayer) {
  const playerKeys = Object.keys(state.savedPlayers);
  if (!state.choice) {
    txt.innerText =
      "Please choose Truth or Dare before moving to the next player.";
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