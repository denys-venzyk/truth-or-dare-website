import { startGame } from "./startGame.js";
import { openWindow } from "./openWindow.js";
import { startBtn, addPlayerBtn } from "./globalVars.js";



startBtn.addEventListener("click", startGame);
addPlayerBtn.addEventListener("click", openWindow);
