

export function highlightCurrentPlayer(state) {
  const playerInputs = document.querySelectorAll("#player-list h1");
  playerInputs.forEach((p) => (p.style.color = "black"));
  if (playerInputs[state.playerSequence]) {
    playerInputs[state.playerSequence].style.color = "green"; 
  }
}
