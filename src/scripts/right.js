import logos from "./logos.js";

export function right(logo, state) {
  state.currentLogo++;

  if (state.currentLogo >= logos.length) {
    state.currentLogo = 0;
  }
  logo.src = logos[state.currentLogo];
}