export function savePlayers() {
  const playerInputs = document.querySelectorAll(".player-inputs h2");
  const playerLogos = document.querySelectorAll(".player-logo");
  const tempPlayers = {};
  playerInputs.forEach((input, index) => {
    tempPlayers[`player${index + 1}`] = {
      name: input.innerText,
      score: 0,
      streak: 0,
      logo: playerLogos[index],
    };
  });

  return tempPlayers;
}