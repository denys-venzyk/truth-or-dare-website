export function removePlayer(id, state) {
  if (state.playerCount > 1) {
    const num = id.id.split("-")[2];
    const playerInput = document.querySelector(`#player-container-${num}`);
    if (playerInput) {
      playerInput.remove();
      for (let i = Number(num) + 1; i < state.playerCount; i++) {
        const player = document.querySelector(`#player-container-${i}`);
        player.id = `player-container-${i - 1}`;
        const input = player.querySelector("h2");
        input.id = `player${i - 1}`;
        input.placeholder = `Player ${i - 1}`;
      }
      state.playerCount--;
    }
  }
}